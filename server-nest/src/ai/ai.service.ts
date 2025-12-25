import { Injectable, Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { PrismaService } from '../prisma/prisma.service';

let fetchFn: any = null;
try { fetchFn = (global as any).fetch || require('node-fetch'); } catch (e) {}

dotenv.config();

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  constructor(private readonly prisma: PrismaService) {}

  async valuate(metadata: any) {
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || process.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      this.logger.log('No Gemini key found, returning mock valuation');
      const mock = this.mockValuation(metadata);
      await this.persistAnalysis(metadata, mock, 'mock');
      return mock;
    }

    const prompt = `You are an AI assistant that estimates the market value of a digital NFT represented by the following metadata: ${JSON.stringify(metadata)}\n\nReturn a JSON object with fields: estimatedValue (number), currency (string), confidence (0-100 integer), analysis (short text in Vietnamese).`;
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generate?key=${apiKey}`;
      const body = { prompt: { text: prompt }, temperature: 0.2, maxOutputTokens: 256 };
      const res = await fetchFn(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const data = await res.json();
      this.logger.log('Received Gemini response');
      let result: any;
      if (data?.candidates && data.candidates.length) {
        result = { analysis: data.candidates[0].content || data.candidates[0].text, aiSource: 'gemini', raw: data };
      } else if (data?.output) {
        result = { analysis: data.output, aiSource: 'gemini', raw: data };
      } else {
        result = { analysis: JSON.stringify(data), aiSource: 'gemini', raw: data };
      }
      try {
        const parsed = typeof result.analysis === 'string' ? JSON.parse(result.analysis) : result.analysis;
        if (parsed && (parsed.estimatedValue || parsed.confidence)) {
          result = { ...result, estimatedValue: parsed.estimatedValue, currency: parsed.currency || 'SUI', confidence: parsed.confidence, analysis: parsed.analysis || result.analysis };
        }
      } catch (e) {}
      await this.persistAnalysis(metadata, result, result.aiSource || 'gemini');
      return result;
    } catch (err) {
      this.logger.error('Gemini call failed: ' + (err?.message || err));
      const mock = this.mockValuation(metadata);
      await this.persistAnalysis(metadata, mock, 'mock');
      return mock;
    }
  }

  async listAnalyses(limit = 20) {
    try {
      return this.prisma.aIAnalysis.findMany({ take: limit, orderBy: { createdAt: 'desc' } });
    } catch (e) {
      this.logger.error('Failed to fetch analyses: ' + (e?.message || e));
      return [];
    }
  }

  private async persistAnalysis(metadata: any, result: any, source: string) {
    try {
      const confidence = result?.confidence ? Math.floor(Number(result.confidence)) : null;
      await this.prisma.aIAnalysis.create({
        data: {
          nftId: null,
          userId: null,
          source,
          result: result,
          confidence: confidence
        }
      });
      this.logger.log('AI analysis persisted to database');
    } catch (e) {
      this.logger.error('Failed to persist AI analysis: ' + (e?.message || e));
    }
  }

  private mockValuation(metadata: any) {
    const basePrice = 100;
    const rarityMultiplier = Math.random() * 5 + 1;
    const marketSentiment = 1.2;
    const estimatedValue = basePrice * rarityMultiplier * marketSentiment;
    const confidence = Math.floor(Math.random() * 15 + 80);
    return { estimatedValue: estimatedValue.toFixed(2), currency: 'SUI', confidence, analysis: 'Mock analysis: fallback', aiSource: 'mock' };
  }
}
