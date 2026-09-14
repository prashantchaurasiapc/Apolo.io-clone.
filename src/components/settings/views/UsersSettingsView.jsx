import React, { useState } from 'react';
import { 
  UserPlus, SlidersHorizontal, Search, ArrowUpDown, 
  ChevronLeft, ChevronRight, ChevronDown, Edit2, MoreHorizontal,
  Download, Check, Trash2, Shield, RefreshCw
} from 'lucide-react';
import InviteUserModal from '../modals/InviteUserModal';
import EditCreditModal from '../modals/EditCreditModal';

export default function UsersSettingsView({ currentUser, showToast }) {
  const [activeTab, setActiveTab] = useState('current'); // 'current' | 'suggested' | 'fields' | 'pending'
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [roleFilter, setRoleFilter] = useState('all');
  const [creditFilter, setCreditFilter] = useState('all');
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [editingCreditUser, setEditingCreditUser] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  // Users Data initialized with the exact match from the screenshot
  const [usersList, setUsersList] = useState([
    {
      id: 1,
      name: currentUser?.name || 'Shivam Ahirwar',
      email: currentUser?.email || 'shivamahirwar773@gmail.com',
      avatar: currentUser?.avatar || 'SA',
      permission: 'Admin',
      credits: 'No credit limit',
      isYou: true,
      createdDate: '2026-08-15'
    }
  ]);

  const [pendingUsers, setPendingUsers] = useState([
    {
      id: 101,
      name: 'Sarah Connor',
      email: 'sarah.c@apollo-team.io',
      permission: 'Standard',
      credits: '500 credits/mo',
      invitedAt: '2 days ago'
    }
  ]);

  const suggestedUsers = [
    { id: 201, name: 'Alex Johnson', email: 'alex.j@gmail.com', role: 'Sales Development Rep' },
    { id: 202, name: 'Priya Sharma', email: 'priya.s@gmail.com', role: 'Account Executive' },
    { id: 203, name: 'Marcus Brody', email: 'marcus.b@gmail.com', role: 'RevOps Lead' }
  ];

  const userFields = [
    { id: 1, name: 'Sales Territory', type: 'Dropdown', required: 'Optional', values: 'North America, EMEA, APAC' },
    { id: 2, name: 'Team / Pod', type: 'Text', required: 'Optional', values: 'Freeform text' },
    { id: 3, name: 'Phone Extension', type: 'Number', required: 'Optional', values: '4-digit code' },
    { id: 4, name: 'Reporting Manager', type: 'User Reference', required: 'Optional', values: 'Select from workspace users' }
  ];

  // Handle select all checkbox
  const toggleSelectAll = () => {
    if (selectedUserIds.length === filteredUsers.length) {
      setSelectedUserIds([]);
    } else {
      setSelectedUserIds(filteredUsers.map(u => u.id));
    }
  };

  const toggleSelectRow = (id) => {
    setSelectedUserIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Add new users from invite modal
  const handleInviteSuccess = (newUser) => {
    setUsersList(prev => [...prev, newUser]);
    showToast?.(`Invitation sent to ${newUser.email}`);
  };

  // Save updated credits
  const handleSaveCredits = (userId, newCredits) => {
    setUsersList(prev => prev.map(u => u.id === userId ? { ...u, credits: newCredits } : u));
    showToast?.('Credit limit updated successfully');
  };

  // Delete user
  const handleDeleteUser = (userId) => {
    const userToDelete = usersList.find(u => u.id === userId);
    if (userToDelete?.isYou) {
      alert("You cannot remove your own active primary administrator account.");
      return;
    }
    setUsersList(prev => prev.filter(u => u.id !== userId));
    setOpenDropdownId(null);
    showToast?.('User removed from workspace');
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ['Name', 'Email', 'Permission Profile', 'Credits Limit', 'Created Date'];
    const rows = usersList.map(u => [
      `"${u.name}"`,
      `"${u.email}"`,
      `"${u.permission}"`,
      `"${u.credits}"`,
      `"${u.createdDate || '2026-09-01'}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'apollo_workspace_users.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast?.('Workspace users exported to CSV');
  };

  // Filtered users list
  const filteredUsers = usersList.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.permission.toLowerCase() === roleFilter.toLowerCase();
    const matchesCredit = creditFilter === 'all' || 
      (creditFilter === 'unlimited' && user.credits.toLowerCase().includes('no credit limit')) ||
      (creditFilter === 'capped' && !user.credits.toLowerCase().includes('no credit limit'));
    return matchesSearch && matchesRole && matchesCredit;
  });

  return (
    <div className="users-view-container">
      {/* ─── 1. Header Title and Top Actions ─── */}
      <div className="users-header-row">
        <h1 className="users-title">Users</h1>
        <div className="users-header-actions">
          <button 
            className="btn-apollo-yellow" 
            onClick={() => setIsInviteModalOpen(true)}
            id="btn-new-user"
          >
            <UserPlus size={14} /> New user
          </button>
          <button 
            className="btn-apollo-outline" 
            onClick={handleExportCSV}
            id="btn-export-csv"
          >
            Export to CSV
          </button>
        </div>
      </div>

      {/* ─── 2. Sub-Tabs Bar ─── */}
      <div className="users-tabs-bar">
        <button 
          className={`users-tab-btn ${activeTab === 'current' ? 'active' : ''}`}
          onClick={() => setActiveTab('current')}
        >
          Current users
        </button>
        <button 
          className={`users-tab-btn ${activeTab === 'suggested' ? 'active' : ''}`}
          onClick={() => setActiveTab('suggested')}
        >
          Suggested users
        </button>
        <button 
          className={`users-tab-btn ${activeTab === 'fields' ? 'active' : ''}`}
          onClick={() => setActiveTab('fields')}
        >
          User fields
        </button>
        <button 
          className={`users-tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          Pending users
        </button>
      </div>

      {/* ─── 3. Main Tab Contents ─── */}
      {activeTab === 'current' && (
        <>
          {/* Promo Navy Banner: "Invite your team & sell more with Apollo" */}
          <div className="users-promo-banner">
            <div className="banner-left-content">
              <div className="banner-avatar-box">
                {/* Robot Illustration matching screenshot */}
                <svg className="banner-robot-icon" viewBox="0 0 32 32" fill="none">
                  <rect x="6" y="8" width="20" height="18" rx="4" fill="#3B82F6" />
                  <circle cx="12" cy="15" r="2.5" fill="#FFFFFF" />
                  <circle cx="20" cy="15" r="2.5" fill="#FFFFFF" />
                  <rect x="12" y="20" width="8" height="2" rx="1" fill="#FFFFFF" />
                  <path d="M16 4V8" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="16" cy="3" r="1.5" fill="#60A5FA" />
                  <rect x="3" y="13" width="3" height="8" rx="1.5" fill="#93C5FD" />
                  <rect x="26" y="13" width="3" height="8" rx="1.5" fill="#93C5FD" />
                </svg>
              </div>
              <div className="banner-text-group">
                <h3>Invite your team & sell more with Apollo</h3>
                <p>Invite teammates and get more deals done—faster.</p>
              </div>
            </div>
            <button 
              className="banner-add-btn" 
              onClick={() => setIsInviteModalOpen(true)}
            >
              <UserPlus size={14} /> Add Teammates
            </button>
          </div>

          {/* Filter Drawer if active */}
          {showFilters && (
            <div className="filters-drawer">
              <div className="filter-group">
                <label>Permission Profile</label>
                <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)}>
                  <option value="all">All Profiles</option>
                  <option value="Admin">Admin</option>
                  <option value="Standard">Standard</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Credit Limit Type</label>
                <select value={creditFilter} onChange={e => setCreditFilter(e.target.value)}>
                  <option value="all">All Limits</option>
                  <option value="unlimited">No Credit Limit</option>
                  <option value="capped">Capped Limits</option>
                </select>
              </div>
            </div>
          )}

          {/* Table Controls Row */}
          <div className="users-table-controls">
            <div className="controls-left">
              <button 
                className={`btn-show-filters ${showFilters ? 'active' : ''}`}
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal size={14} />
                <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
              </button>

              <div className="users-table-search-box">
                <Search size={13} color="#9ca3af" />
                <input 
                  type="text" 
                  placeholder="Search" 
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="controls-right">
              <button className="btn-sort-control">
                <ArrowUpDown size={13} />
                <span>Created Date</span>
                <ChevronDown size={12} />
              </button>
            </div>
          </div>

          {/* Users Table */}
          <div className="users-table-container">
            <table className="users-table">
              <thead>
                <tr>
                  <th className="col-checkbox">
                    <input 
                      type="checkbox" 
                      checked={filteredUsers.length > 0 && selectedUserIds.length === filteredUsers.length}
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th>USERS</th>
                  <th>PERMISSION PROFILE</th>
                  <th>CREDITS</th>
                  <th style={{ width: 40 }}></th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', padding: '32px 16px', color: '#6b7280' }}>
                      No users match your current filter.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map(user => (
                    <tr key={user.id}>
                      <td className="col-checkbox">
                        <input 
                          type="checkbox" 
                          checked={selectedUserIds.includes(user.id)}
                          onChange={() => toggleSelectRow(user.id)}
                        />
                      </td>
                      <td>
                        <div className="user-info-cell">
                          <div className="user-avatar-badge">
                            {user.avatar || 'SA'}
                          </div>
                          <div className="user-details">
                            <span className="user-name-text">
                              {user.name} {user.isYou ? '(You)' : ''}
                            </span>
                            <span className="user-email-text">
                              {user.email}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span 
                          className="pill-badge clickable"
                          onClick={() => showToast?.(`Permission profile: ${user.permission}`)}
                        >
                          {user.permission}
                        </span>
                      </td>
                      <td>
                        <span 
                          className="pill-badge clickable"
                          onClick={() => setEditingCreditUser(user)}
                          title="Click to edit credit limit"
                        >
                          <Edit2 size={11} color="#64748b" style={{ marginRight: 2 }} />
                          {user.credits}
                        </span>
                      </td>
                      <td style={{ position: 'relative' }}>
                        <button 
                          className="btn-row-action"
                          onClick={() => setOpenDropdownId(openDropdownId === user.id ? null : user.id)}
                        >
                          <MoreHorizontal size={15} />
                        </button>

                        {openDropdownId === user.id && (
                          <div className="row-actions-dropdown">
                            <button 
                              className="row-action-item"
                              onClick={() => {
                                setEditingCreditUser(user);
                                setOpenDropdownId(null);
                              }}
                            >
                              <Edit2 size={12} /> Edit credit limit
                            </button>
                            <button 
                              className="row-action-item"
                              onClick={() => {
                                const newRole = user.permission === 'Admin' ? 'Standard' : 'Admin';
                                setUsersList(prev => prev.map(u => u.id === user.id ? { ...u, permission: newRole } : u));
                                setOpenDropdownId(null);
                                showToast?.(`Role updated to ${newRole}`);
                              }}
                            >
                              <Shield size={12} /> Toggle Admin / Standard
                            </button>
                            {!user.isYou && (
                              <button 
                                className="row-action-item danger"
                                onClick={() => handleDeleteUser(user.id)}
                              >
                                <Trash2 size={12} /> Remove user
                              </button>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="users-pagination-row">
              <button className="btn-pagination-nav" disabled>
                <ChevronLeft size={14} />
              </button>
              
              <div className="pagination-dropdown-pill">
                <span>1</span>
                <ChevronDown size={11} />
              </div>

              <button className="btn-pagination-nav" disabled>
                <ChevronRight size={14} />
              </button>

              <span style={{ marginLeft: 8 }}>
                1 - {filteredUsers.length} of {filteredUsers.length}
              </span>
            </div>
          </div>
        </>
      )}

      {/* ─── Suggested Users Tab ─── */}
      {activeTab === 'suggested' && (
        <div className="settings-card">
          <h2>Colleagues using your email domain</h2>
          <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 16 }}>
            Apollo discovered these teammates with email addresses in your domain who are not yet on your workspace.
          </p>
          <table className="users-table">
            <thead>
              <tr><th>NAME</th><th>EMAIL</th><th>ROLE</th><th>ACTION</th></tr>
            </thead>
            <tbody>
              {suggestedUsers.map(s => (
                <tr key={s.id}>
                  <td style={{ fontWeight: 500 }}>{s.name}</td>
                  <td style={{ color: '#6b7280' }}>{s.email}</td>
                  <td>{s.role}</td>
                  <td>
                    <button 
                      className="btn-apollo-yellow"
                      style={{ padding: '4px 10px', fontSize: 12 }}
                      onClick={() => {
                        handleInviteSuccess({
                          id: Date.now(),
                          name: s.name,
                          email: s.email,
                          avatar: s.name.split(' ').map(n=>n[0]).join(''),
                          permission: 'Standard',
                          credits: 'No credit limit',
                          isYou: false
                        });
                      }}
                    >
                      <UserPlus size={12} /> Invite
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ─── User Fields Tab ─── */}
      {activeTab === 'fields' && (
        <div className="settings-card">
          <h2>Custom User Attributes & Fields</h2>
          <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 16 }}>
            Customize additional metadata fields assigned to users in your workspace.
          </p>
          <table className="users-table">
            <thead>
              <tr><th>FIELD NAME</th><th>TYPE</th><th>REQUIRED</th><th>ALLOWED VALUES</th></tr>
            </thead>
            <tbody>
              {userFields.map(f => (
                <tr key={f.id}>
                  <td style={{ fontWeight: 600 }}>{f.name}</td>
                  <td><span className="pill-badge">{f.type}</span></td>
                  <td>{f.required}</td>
                  <td style={{ color: '#64748b' }}>{f.values}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ─── Pending Users Tab ─── */}
      {activeTab === 'pending' && (
        <div className="settings-card">
          <h2>Pending Workspace Invitations</h2>
          <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 16 }}>
            These teammates have received an invitation email but haven't logged in yet.
          </p>
          <table className="users-table">
            <thead>
              <tr><th>NAME</th><th>EMAIL</th><th>ROLE</th><th>INVITED</th><th>ACTIONS</th></tr>
            </thead>
            <tbody>
              {pendingUsers.map(p => (
                <tr key={p.id}>
                  <td style={{ fontWeight: 500 }}>{p.name}</td>
                  <td>{p.email}</td>
                  <td><span className="pill-badge">{p.permission}</span></td>
                  <td style={{ color: '#64748b' }}>{p.invitedAt}</td>
                  <td>
                    <button 
                      className="btn-apollo-outline" 
                      style={{ padding: '3px 8px', fontSize: 11.5 }}
                      onClick={() => showToast?.(`Invitation resent to ${p.email}`)}
                    >
                      <RefreshCw size={11} /> Resend
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ─── Modals ─── */}
      <InviteUserModal 
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onInvite={handleInviteSuccess}
      />

      <EditCreditModal 
        isOpen={!!editingCreditUser}
        user={editingCreditUser}
        onClose={() => setEditingCreditUser(null)}
        onSave={handleSaveCredits}
      />
    </div>
  );
}
