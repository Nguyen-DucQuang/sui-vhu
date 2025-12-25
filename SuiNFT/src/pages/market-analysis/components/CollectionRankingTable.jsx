import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CollectionRankingTable = ({ collections, title }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'volume', direction: 'desc' });

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig?.key === key && sortConfig?.direction === 'desc' ? 'asc' : 'desc'
    });
  };

  const sortedCollections = [...collections]?.sort((a, b) => {
    const aValue = a?.[sortConfig?.key];
    const bValue = b?.[sortConfig?.key];
    const modifier = sortConfig?.direction === 'asc' ? 1 : -1;
    return aValue > bValue ? modifier : -modifier;
  });

  const SortIcon = ({ columnKey }) => {
    if (sortConfig?.key !== columnKey) {
      return <Icon name="ChevronsUpDown" size={14} className="opacity-50" />;
    }
    return (
      <Icon 
        name={sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
        size={14} 
        color="var(--color-primary)" 
      />
    );
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="p-4 md:p-6 border-b border-border">
        <h3 className="text-lg md:text-xl font-heading font-bold">{title}</h3>
      </div>
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto scrollbar-custom">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">#</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Bộ sưu tập</th>
              <th 
                className="text-right p-4 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-smooth"
                onClick={() => handleSort('floorPrice')}
              >
                <div className="flex items-center justify-end gap-1">
                  Giá sàn
                  <SortIcon columnKey="floorPrice" />
                </div>
              </th>
              <th 
                className="text-right p-4 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-smooth"
                onClick={() => handleSort('volume')}
              >
                <div className="flex items-center justify-end gap-1">
                  Khối lượng
                  <SortIcon columnKey="volume" />
                </div>
              </th>
              <th 
                className="text-right p-4 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-smooth"
                onClick={() => handleSort('change')}
              >
                <div className="flex items-center justify-end gap-1">
                  Thay đổi 24h
                  <SortIcon columnKey="change" />
                </div>
              </th>
              <th className="text-right p-4 text-sm font-medium text-muted-foreground">AI Score</th>
            </tr>
          </thead>
          <tbody>
            {sortedCollections?.map((collection, index) => (
              <tr 
                key={collection?.id} 
                className="border-t border-border hover:bg-muted/30 transition-smooth"
              >
                <td className="p-4 text-sm text-muted-foreground">{index + 1}</td>
                <td className="p-4">
                  <Link to="/nft-details" className="flex items-center gap-3 hover:opacity-80 transition-smooth">
                    <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                      <Image 
                        src={collection?.image} 
                        alt={collection?.imageAlt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{collection?.name}</p>
                      <p className="text-xs text-muted-foreground">{collection?.items} items</p>
                    </div>
                  </Link>
                </td>
                <td className="p-4 text-right">
                  <p className="font-medium data-text">{collection?.floorPrice} ETH</p>
                </td>
                <td className="p-4 text-right">
                  <p className="font-medium data-text">{collection?.volume} ETH</p>
                </td>
                <td className="p-4 text-right">
                  <span className={`font-medium flex items-center justify-end gap-1 ${
                    collection?.change >= 0 ? 'text-success' : 'text-error'
                  }`}>
                    <Icon 
                      name={collection?.change >= 0 ? 'ArrowUp' : 'ArrowDown'} 
                      size={14} 
                    />
                    {Math.abs(collection?.change)}%
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                        style={{ width: `${collection?.aiScore}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium data-text">{collection?.aiScore}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card View */}
      <div className="lg:hidden divide-y divide-border">
        {sortedCollections?.map((collection, index) => (
          <Link 
            key={collection?.id}
            to="/nft-details"
            className="block p-4 hover:bg-muted/30 transition-smooth"
          >
            <div className="flex items-start gap-3 mb-3">
              <span className="text-sm text-muted-foreground font-medium">{index + 1}</span>
              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                <Image 
                  src={collection?.image} 
                  alt={collection?.imageAlt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{collection?.name}</p>
                <p className="text-xs text-muted-foreground">{collection?.items} items</p>
              </div>
              <span className={`font-medium text-sm flex items-center gap-1 flex-shrink-0 ${
                collection?.change >= 0 ? 'text-success' : 'text-error'
              }`}>
                <Icon name={collection?.change >= 0 ? 'ArrowUp' : 'ArrowDown'} size={14} />
                {Math.abs(collection?.change)}%
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-muted-foreground text-xs mb-1">Giá sàn</p>
                <p className="font-medium data-text">{collection?.floorPrice} ETH</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs mb-1">Khối lượng</p>
                <p className="font-medium data-text">{collection?.volume} ETH</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">AI Score</span>
              <div className="flex items-center gap-2">
                <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-accent"
                    style={{ width: `${collection?.aiScore}%` }}
                  />
                </div>
                <span className="text-sm font-medium data-text">{collection?.aiScore}%</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CollectionRankingTable;