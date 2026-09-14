import React, { useState } from 'react';
import {
  User, Building2, HelpCircle, Info, Plus, Search, Trash2, MoreVertical,
  Download, ExternalLink, FileSpreadsheet, Check, X, ChevronRight, ChevronDown,
  Lock, Users, Sparkles, Filter, ArrowLeft
} from 'lucide-react';

import '../../css/lists-view.css';

export default function ListsView({ showToast, onNavigateToProspect }) {
  // State for user's created lists
  const [lists, setLists] = useState([
    {
      id: 'list-1',
      name: 'Q3 Enterprise Tech CEOs',
      type: 'people',
      recordsCount: 142,
      createdDate: 'Sep 02, 2026',
      visibility: 'Restricted',
      description: 'High priority C-level prospects in North America'
    },
    {
      id: 'list-2',
      name: 'UK FinTech Target Accounts',
      type: 'company',
      recordsCount: 88,
      createdDate: 'Aug 28, 2026',
      visibility: 'Shared',
      description: 'Fintech and banking companies with 50-500 employees'
    }
  ]);

  // View state: 'welcome' (forced empty view matching screenshot) or 'table'
  const [viewState, setViewState] = useState('welcome');

  // Modal / Drawer state for creating list
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [listTypeToCreate, setListTypeToCreate] = useState('people'); // 'people' | 'company'
  const [newListName, setNewListName] = useState('');
  const [newListDesc, setNewListDesc] = useState('');
  const [nameError, setNameError] = useState(false);

  // Search filter inside lists table view
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedList, setSelectedList] = useState(null);

  // Open creation modal for specific type
  const handleOpenCreate = (type) => {
    setListTypeToCreate(type);
    setNewListName(type === 'people' ? 'New People List' : 'New Company List');
    setNewListDesc('');
    setNameError(false);
    setCreateModalOpen(true);
  };

  // Submit new list
  const handleCreateList = () => {
    if (!newListName.trim()) {
      setNameError(true);
      return;
    }

    const createdItem = {
      id: `list-${Date.now()}`,
      name: newListName.trim(),
      type: listTypeToCreate,
      recordsCount: listTypeToCreate === 'people' ? 24 : 12,
      createdDate: 'Today',
      visibility: 'Restricted',
      description: newListDesc.trim() || `${listTypeToCreate === 'people' ? 'People' : 'Company'} prospect list`
    };

    setLists(prev => [createdItem, ...prev]);
    setCreateModalOpen(false);
    setViewState('table');
    showToast(`Created new ${listTypeToCreate} list "${createdItem.name}"`);
  };

  // Delete list handler
  const handleDeleteList = (id, name, e) => {
    if (e) e.stopPropagation();
    setLists(prev => prev.filter(l => l.id !== id));
    showToast(`Deleted list "${name}"`);
    if (selectedList?.id === id) setSelectedList(null);
  };

  // Filtered lists for table
  const filteredLists = lists.filter(l => 
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="dash-view-content apollo-my-lists-page">
      {/* ── TOP HEADER BAR ── */}
      <div className="my-lists-top-header">
        <h1 className="my-lists-title">My lists</h1>
        
        {viewState === 'table' && (
          <div className="header-right-actions">
            <button 
              className="view-toggle-btn"
              onClick={() => setViewState('welcome')}
              title="View Welcome Template Page"
            >
              Show Template View
            </button>

            <button 
              className="create-list-primary-btn"
              onClick={() => handleOpenCreate('people')}
            >
              <Plus size={15} />
              <span>Create list</span>
              <ChevronDown size={14} />
            </button>
          </div>
        )}

        {viewState === 'welcome' && lists.length > 0 && (
          <button 
            className="view-existing-lists-btn"
            onClick={() => setViewState('table')}
          >
            View My Active Lists ({lists.length}) →
          </button>
        )}
      </div>

      {/* ── MAIN BODY CONTENT ── */}
      <div className="my-lists-body-area">
        {viewState === 'welcome' ? (
          /* ── 1:1 SCREENSHOT MATCHING WELCOME EMPTY STATE ── */
          <div className="lists-welcome-empty-card">
            
            {/* 1:1 Vector Illustration matching screenshot */}
            <div className="lists-illustration-wrapper">
              <svg 
                width="140" 
                height="140" 
                viewBox="0 0 140 140" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="lists-graphic-svg"
              >
                {/* Top Spark / Motion Lines */}
                <path d="M70 12V22" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M86 16L79 24" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M100 30L90 34" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 3" />

                {/* Main Blue Document Card */}
                <rect x="36" y="28" width="68" height="74" rx="8" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="2.5" />

                {/* Horizontal List Items (Dots + Lines) */}
                {/* Line 1 */}
                <circle cx="48" cy="44" r="2.5" fill="#3B82F6" />
                <rect x="56" y="42.5" width="36" height="3" rx="1.5" fill="#3B82F6" />
                <rect x="94" y="42.5" width="4" height="3" rx="1.5" fill="#60A5FA" />

                {/* Line 2 */}
                <circle cx="48" cy="56" r="2.5" fill="#3B82F6" />
                <rect x="56" y="54.5" width="40" height="3" rx="1.5" fill="#3B82F6" />

                {/* Line 3 */}
                <circle cx="48" cy="68" r="2.5" fill="#3B82F6" />
                <rect x="56" y="66.5" width="28" height="3" rx="1.5" fill="#3B82F6" />
                <rect x="86" y="66.5" width="10" height="3" rx="1.5" fill="#60A5FA" />

                {/* Line 4 */}
                <circle cx="48" cy="80" r="2.5" fill="#3B82F6" />
                <rect x="56" y="78.5" width="32" height="3" rx="1.5" fill="#3B82F6" />

                {/* Bottom Liquid Drops Accent (Matching Screenshot) */}
                <path d="M40 98C40 98 42 110 45 110C48 110 50 102 53 102C56 102 58 114 62 114C66 114 68 100 68 100" fill="#3B82F6" />
                <circle cx="50" cy="116" r="3.5" fill="#3B82F6" />
                <circle cx="62" cy="120" r="2.5" fill="#60A5FA" />
              </svg>
            </div>

            {/* Title & Description */}
            <h2 className="lists-welcome-heading">Welcome to your lists</h2>
            <p className="lists-welcome-subtext">
              Lists help you organize your prospects and start targeted campaigns. Pick a template below to get started
            </p>

            {/* Template Buttons (1:1 Match to Screenshot) */}
            <div className="lists-template-buttons-row">
              <button 
                className="template-action-btn"
                onClick={() => handleOpenCreate('people')}
              >
                <User size={18} color="#475569" className="btn-icon" />
                <span>Create a people list</span>
              </button>

              <button 
                className="template-action-btn"
                onClick={() => handleOpenCreate('company')}
              >
                <Building2 size={18} color="#475569" className="btn-icon" />
                <span>Create a company list</span>
              </button>
            </div>

            {/* Footer Learn More Link */}
            <div className="lists-learn-more-row">
              <a 
                href="#/app/prospect/people" 
                onClick={(e) => {
                  e.preventDefault();
                  showToast('Opening Lists Documentation & Guide...');
                }}
                className="learn-more-link"
              >
                <Info size={15} color="#64748b" />
                <span>Learn more about lists</span>
              </a>
            </div>

          </div>
        ) : (
          /* ── ACTIVE LISTS TABLE VIEW ── */
          <div className="active-lists-container">
            <div className="table-filter-bar">
              <div className="search-box-wrap">
                <Search size={15} color="#94a3b8" />
                <input 
                  type="text" 
                  placeholder="Search lists..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>

              <div className="filter-right-group">
                <button className="create-type-btn" onClick={() => handleOpenCreate('people')}>
                  <User size={14} /> + People List
                </button>
                <button className="create-type-btn" onClick={() => handleOpenCreate('company')}>
                  <Building2 size={14} /> + Company List
                </button>
              </div>
            </div>

            {filteredLists.length === 0 ? (
              <div className="no-lists-found">
                <p>No lists match your search.</p>
                <button className="clear-btn" onClick={() => setSearchQuery('')}>Clear Search</button>
              </div>
            ) : (
              <div className="lists-table-card">
                <table className="custom-lists-table">
                  <thead>
                    <tr>
                      <th>LIST NAME</th>
                      <th>TYPE</th>
                      <th>RECORDS</th>
                      <th>CREATED</th>
                      <th>VISIBILITY</th>
                      <th style={{ textAlign: 'right' }}>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLists.map(item => (
                      <tr 
                        key={item.id}
                        className="list-row"
                        onClick={() => setSelectedList(item)}
                      >
                        <td className="td-name">
                          <div className="name-with-icon">
                            {item.type === 'people' ? (
                              <User size={16} color="#2563eb" />
                            ) : (
                              <Building2 size={16} color="#059669" />
                            )}
                            <div>
                              <span className="list-name-title">{item.name}</span>
                              <span className="list-desc-sub">{item.description}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className={`type-badge ${item.type}`}>
                            {item.type === 'people' ? 'People' : 'Company'}
                          </span>
                        </td>
                        <td><strong>{item.recordsCount}</strong> items</td>
                        <td>{item.createdDate}</td>
                        <td>
                          <span className="visibility-tag">
                            <Lock size={12} /> {item.visibility}
                          </span>
                        </td>
                        <td style={{ textAlign: 'right' }} onClick={(e) => e.stopPropagation()}>
                          <div className="action-buttons-cell">
                            <button 
                              className="table-action-icon-btn" 
                              title="Export CSV"
                              onClick={() => showToast(`Exported ${item.name} to CSV`)}
                            >
                              <Download size={14} color="#64748b" />
                            </button>
                            <button 
                              className="table-action-icon-btn danger" 
                              title="Delete List"
                              onClick={(e) => handleDeleteList(item.id, item.name, e)}
                            >
                              <Trash2 size={14} color="#ef4444" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── FLOATING HELP QUESTION MARK BUTTON (1:1 SCREENSHOT) ── */}
      <button 
        className="lists-floating-help-btn"
        title="Help & Documentation"
        onClick={() => showToast('Opening Lists Help Center...')}
      >
        <span className="help-question-mark">?</span>
      </button>

      {/* ── CREATE LIST MODAL / DRAWER ── */}
      {createModalOpen && (
        <div className="prospect-drawer-backdrop" onClick={() => setCreateModalOpen(false)}>
          <div className="create-search-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header-bar">
              <h2 className="drawer-title-text">
                Create {listTypeToCreate === 'people' ? 'people' : 'company'} list
              </h2>
              <button className="drawer-close-btn" onClick={() => setCreateModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="drawer-body-content">
              {/* List Name Input */}
              <div className="form-field-group">
                <label className="field-label-required">
                  List name <span className="red-star">*</span>
                </label>
                <div className={`input-with-error-wrap ${nameError && !newListName.trim() ? 'has-error' : ''}`}>
                  <input 
                    type="text" 
                    placeholder={`Enter ${listTypeToCreate} list name`}
                    value={newListName}
                    onChange={(e) => {
                      setNewListName(e.target.value);
                      if (e.target.value.trim()) setNameError(false);
                    }}
                    className="create-search-input"
                    autoFocus
                  />
                  {nameError && !newListName.trim() && (
                    <span className="error-alert-icon">!</span>
                  )}
                </div>
                {nameError && !newListName.trim() && (
                  <span className="error-message-text">This field is required.</span>
                )}
              </div>

              {/* Description Input */}
              <div className="form-field-group">
                <label className="field-label-required">Description (optional)</label>
                <input 
                  type="text" 
                  placeholder="What is this list for?" 
                  value={newListDesc}
                  onChange={(e) => setNewListDesc(e.target.value)}
                  className="create-search-input"
                />
              </div>

              {/* Template Type Settings */}
              <div className="drawer-sub-section">
                <div className="section-meta-label">List type</div>
                <div className="section-row-item">
                  <div className="row-left">
                    {listTypeToCreate === 'people' ? <User size={16} color="#2563eb" /> : <Building2 size={16} color="#059669" />}
                    <span>{listTypeToCreate === 'people' ? 'People Prospects List' : 'Company Accounts List'}</span>
                  </div>
                  <div className="row-right">
                    <span className="count-badge-grey">Selected</span>
                  </div>
                </div>
              </div>

              {/* More settings Section */}
              <div className="drawer-sub-section">
                <div className="section-meta-label">More settings</div>
                <div className="section-row-item">
                  <div className="row-left">
                    <Lock size={16} color="#475569" />
                    <span>Visibility and sharing</span>
                  </div>
                  <div className="row-right">
                    <span className="text-val-grey">Restricted</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Footer Action Buttons */}
            <div className="drawer-footer-actions">
              <button className="cancel-text-btn" onClick={() => setCreateModalOpen(false)}>
                Cancel
              </button>
              <button 
                className="create-search-yellow-btn"
                onClick={handleCreateList}
              >
                Create list
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ── SELECTED LIST DETAIL MODAL / DRAWER ── */}
      {selectedList && (
        <div className="prospect-drawer-backdrop" onClick={() => setSelectedList(null)}>
          <div className="prospect-profile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header-bar">
              <span className="drawer-title-sub">List Details</span>
              <button className="drawer-close-btn" onClick={() => setSelectedList(null)}><X size={18} /></button>
            </div>
            <div className="drawer-content-body">
              <div className="drawer-profile-hero">
                <div className="hero-avatar" style={{ background: selectedList.type === 'people' ? '#dbeafe' : '#d1fae5', color: selectedList.type === 'people' ? '#1d4ed8' : '#047857' }}>
                  {selectedList.type === 'people' ? <User size={24} /> : <Building2 size={24} />}
                </div>
                <div className="hero-details">
                  <h2>{selectedList.name}</h2>
                  <p className="hero-title">{selectedList.description}</p>
                  <p className="hero-company">{selectedList.recordsCount} records • Created {selectedList.createdDate}</p>
                </div>
              </div>

              <div className="drawer-section">
                <h3>Actions</h3>
                <div className="drawer-actions-grid" style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                  <button 
                    className="prospect-tool-btn white-tool-btn"
                    onClick={() => {
                      setSelectedList(null);
                      if (onNavigateToProspect) {
                        onNavigateToProspect(selectedList.type === 'people' ? 'people' : 'companies');
                      } else {
                        showToast(`Viewing prospects in ${selectedList.name}`);
                      }
                    }}
                  >
                    <Search size={14} /> Find & Add Prospects
                  </button>

                  <button 
                    className="prospect-tool-btn white-tool-btn"
                    onClick={() => showToast(`Exported ${selectedList.name} CSV`)}
                  >
                    <Download size={14} /> Export CSV
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
