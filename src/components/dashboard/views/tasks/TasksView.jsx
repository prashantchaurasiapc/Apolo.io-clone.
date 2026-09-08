import React, { useState, useMemo } from 'react';
import {
  Phone, Plus, Search, SlidersHorizontal, ArrowUpDown, Settings, Info,
  Check, X, Calendar, User, Mail, AlertCircle, Trash2, CheckCircle2,
  Lock, LayoutGrid, ChevronDown, ChevronRight, Eye, ShieldCheck
} from 'lucide-react';

const LinkedinIcon = ({ size = 14, color = '#0284c7' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
  </svg>
);

import '../../css/tasks-view.css';

export default function TasksView({ showToast, onNavigateToProspect }) {
  // Active Tab: 'all' | 'call' | 'email' | 'linkedin' | 'overdue' | 'all_yours'
  const [activeTab, setActiveTab] = useState('all');

  // Filter Sidebar Toggle & Search Query
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('due_date');
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  // Drawer / Modal for Creating Task
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskType, setTaskType] = useState('call'); // 'call' | 'email' | 'linkedin'
  const [taskPriority, setTaskPriority] = useState('medium');
  const [taskContact, setTaskContact] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('2026-09-08');
  const [taskDueTime, setTaskDueTime] = useState('04:54 PM');
  const [taskAssignee, setTaskAssignee] = useState('6a9f9e61385fc70018306909');
  const [nameError, setNameError] = useState(false);

  // Active Tasks List State (Defaults to empty 0 tasks matching screenshot 1:1)
  const [tasksList, setTasksList] = useState([]);

  // Count helper by type
  const counts = useMemo(() => {
    const uncompleted = tasksList.filter(t => !t.completed);
    return {
      all: uncompleted.length,
      call: uncompleted.filter(t => t.type === 'call').length,
      email: uncompleted.filter(t => t.type === 'email').length,
      linkedin: uncompleted.filter(t => t.type === 'linkedin').length,
      overdue: uncompleted.filter(t => t.dueDate && t.dueDate.toLowerCase().includes('overdue')).length,
    };
  }, [tasksList]);

  // Filtered Tasks for Table View
  const filteredTasks = useMemo(() => {
    return tasksList.filter(t => {
      if (activeTab === 'call' && t.type !== 'call') return false;
      if (activeTab === 'email' && t.type !== 'email') return false;
      if (activeTab === 'linkedin' && t.type !== 'linkedin') return false;
      if (activeTab === 'overdue' && (!t.dueDate || !t.dueDate.toLowerCase().includes('overdue'))) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return t.title.toLowerCase().includes(q) || t.contact.toLowerCase().includes(q) || t.company.toLowerCase().includes(q);
      }
      return true;
    });
  }, [tasksList, activeTab, searchQuery]);

  // Open Create Task Modal
  const handleOpenCreate = () => {
    setTaskName('');
    setTaskType('call');
    setTaskPriority('medium');
    setTaskContact('');
    setTaskDescription('');
    setTaskDueDate('2026-09-08');
    setTaskDueTime('04:54 PM');
    setNameError(false);
    setCreateModalOpen(true);
  };

  // Submit New Task
  const handleCreateTask = () => {
    if (!taskName.trim()) {
      setNameError(true);
      return;
    }

    const newTask = {
      id: `task-${Date.now()}`,
      title: taskName.trim(),
      contact: taskContact || 'Chloe Kim',
      company: 'Target Prospect',
      type: taskType,
      sequence: 'Outreach campaign',
      dueDate: `${taskDueDate} ${taskDueTime}`,
      priority: taskPriority.charAt(0).toUpperCase() + taskPriority.slice(1),
      completed: false
    };

    setTasksList(prev => [newTask, ...prev]);
    setCreateModalOpen(false);
    showToast(`Created ${taskType} task "${newTask.title}"`);
  };

  // Toggle Complete Task
  const toggleCompleteTask = (id, e) => {
    if (e) e.stopPropagation();
    setTasksList(prev => prev.map(t => {
      if (t.id === id) {
        const nextState = !t.completed;
        showToast(nextState ? `Completed task: ${t.title}` : `Re-opened task: ${t.title}`);
        return { ...t, completed: nextState };
      }
      return t;
    }));
  };

  return (
    <div className="dash-view-content apollo-tasks-page">
      
      {/* ── 1. TOP HEADER BAR (1:1 MATCH TO SCREENSHOT) ── */}
      <div className="tasks-top-header">
        <h1 className="tasks-page-title">Tasks</h1>

        <div className="tasks-header-right-actions">
          {/* Start call session button */}
          <button 
            className="start-call-session-btn"
            onClick={() => showToast('Starting Dialer & Call Session...')}
          >
            <Phone size={14} color="#a1a1aa" />
            <span>Start call session</span>
          </button>

          {/* Yellow + Create task button */}
          <button 
            className="create-task-yellow-btn"
            onClick={handleOpenCreate}
          >
            <Plus size={16} strokeWidth={2.5} />
            <span>Create task</span>
          </button>
        </div>
      </div>

      {/* ── 2. SUB-NAVIGATION TABS BAR WITH BADGES (1:1 MATCH TO SCREENSHOT) ── */}
      <div className="tasks-tabs-bar">
        <button 
          className={`tasks-tab-item ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          <span>All tasks</span>
          <span className="task-count-badge">{counts.all}</span>
        </button>

        <button 
          className={`tasks-tab-item ${activeTab === 'call' ? 'active' : ''}`}
          onClick={() => setActiveTab('call')}
        >
          <span>Call tasks</span>
          <span className="task-count-badge">{counts.call}</span>
        </button>

        <button 
          className={`tasks-tab-item ${activeTab === 'email' ? 'active' : ''}`}
          onClick={() => setActiveTab('email')}
        >
          <span>Email tasks</span>
          <span className="task-count-badge">{counts.email}</span>
        </button>

        <button 
          className={`tasks-tab-item ${activeTab === 'linkedin' ? 'active' : ''}`}
          onClick={() => setActiveTab('linkedin')}
        >
          <span>LinkedIn tasks</span>
          <span className="task-count-badge">{counts.linkedin}</span>
        </button>

        <button 
          className={`tasks-tab-item ${activeTab === 'overdue' ? 'active' : ''}`}
          onClick={() => setActiveTab('overdue')}
        >
          <span>Overdue tasks</span>
          <span className="task-count-badge">{counts.overdue}</span>
        </button>

        <button 
          className={`tasks-tab-item ${activeTab === 'all_yours' ? 'active' : ''}`}
          onClick={() => setActiveTab('all_yours')}
        >
          <span>All your tasks</span>
        </button>

        <button 
          className="tasks-tab-item views-dropdown-trigger"
          onClick={() => showToast('Opening Custom Task Views...')}
        >
          <LayoutGrid size={14} color="#71717a" />
          <span>Views</span>
          <ChevronDown size={13} color="#71717a" />
        </button>
      </div>

      {/* ── 3. STICKY FILTER TOOLBAR (1:1 MATCH TO SCREENSHOT) ── */}
      <div className="tasks-filter-toolbar">
        <div className="toolbar-left-group">
          {/* Show Filters button */}
          <button 
            className={`white-toolbar-btn ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal size={14} color="#3f3f46" />
            <span>Show Filters</span>
            <span className="filter-count-badge">2</span>
          </button>

          {/* Search tasks input */}
          <div className="search-tasks-input-wrap">
            <Search size={14} color="#a1a1aa" className="search-icon" />
            <input 
              type="text" 
              placeholder="Search tasks" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-tasks-input"
            />
          </div>
        </div>

        <div className="toolbar-right-group">
          {/* Save as new view button */}
          <button 
            className="white-toolbar-btn save-view-btn"
            onClick={() => showToast('View Saved Successfully')}
          >
            <span>Save as new view</span>
          </button>

          {/* Sort dropdown */}
          <div className="dropdown-relative-wrap">
            <button 
              className="white-toolbar-btn"
              onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
            >
              <ArrowUpDown size={13} color="#3f3f46" />
              <span>Sort</span>
              <span className="filter-count-badge">1</span>
              <ChevronDown size={13} color="#3f3f46" />
            </button>

            {sortDropdownOpen && (
              <div className="enrichment-popover-menu bottom-right">
                <div className="popover-item" onClick={() => { setSortBy('due_date'); setSortDropdownOpen(false); }}>Due Date (Soonest first)</div>
                <div className="popover-item" onClick={() => { setSortBy('priority'); setSortDropdownOpen(false); }}>Priority (High to Low)</div>
                <div className="popover-item" onClick={() => { setSortBy('created'); setSortDropdownOpen(false); }}>Creation Date</div>
              </div>
            )}
          </div>

          {/* View options button */}
          <button 
            className="view-options-btn"
            onClick={() => showToast('Opening Task Display Options...')}
          >
            <Settings size={14} color="#3f3f46" />
            <span>View options</span>
          </button>
        </div>
      </div>

      {/* ── 4. MAIN BODY CONTENT AREA ── */}
      <div className="tasks-main-body-container">
        {tasksList.length === 0 ? (
          /* ── 1:1 SCREENSHOT WELCOME EMPTY STATE VIEW ── */
          <div className="tasks-empty-card-container">
            
            {/* 1:1 Precision Micro-Card Vector Illustration matching screenshot */}
            <div className="tasks-illustration-card-box">
              {/* Header Row */}
              <div className="mock-grid-table-header">
                <div className="mock-col task-col">Task</div>
                <div className="mock-col source-col">Task source ▾</div>
                <div className="mock-col date-col">Due date ▾</div>
                <div className="mock-col priority-col">Priority</div>
              </div>

              {/* Highlighted Active Task Row */}
              <div className="mock-grid-active-row">
                <div className="mock-cell task-cell">
                  <div className="mock-email-icon-box">
                    <Mail size={12} color="#0284c7" />
                  </div>
                  <span className="mock-task-title-text">Email Chloe Kim</span>
                </div>

                <div className="mock-cell contact-cell">
                  <div className="mock-avatar-pill">JK</div>
                  <div className="mock-contact-meta">
                    <span className="mock-contact-name">Chloe Kim</span>
                    <span className="mock-contact-sub">VP of Marketing</span>
                  </div>
                </div>

                <div className="mock-cell source-cell">
                  <div className="mock-sequence-badge">
                    <span className="arrow-prefix">›</span>
                    <span>Outreach campaign</span>
                  </div>
                </div>

                <div className="mock-cell date-cell">
                  <span className="mock-date-label">in 3d</span>
                </div>

                <div className="mock-cell priority-cell">
                  <span className="mock-priority-chip">High</span>
                </div>

                <div className="mock-cell action-cell">
                  <div className="mock-check-circle-box" title="Complete task">
                    <Check size={11} color="#3f3f46" strokeWidth={2.5} />
                  </div>

                  {/* Black Floating Tooltip */}
                  <div className="floating-complete-tooltip">
                    <span>Complete task</span>
                    <div className="tooltip-arrow-down"></div>
                  </div>

                  {/* Mouse Pointer Cursor Icon */}
                  <div className="mock-pointer-cursor">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="#18181b" stroke="#ffffff" strokeWidth="1.5">
                      <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Faint Skeleton Rows matching screenshot */}
              <div className="mock-grid-skel-row">
                <div className="skel-icon call">
                  <Phone size={10} color="#059669" />
                </div>
                <div className="skel-bar line-long"></div>
                <div className="skel-bar line-mid"></div>
                <div className="skel-bar line-short"></div>
                <div className="skel-pill green"></div>
              </div>

              <div className="mock-grid-skel-row">
                <div className="skel-icon email">
                  <Mail size={10} color="#2563eb" />
                </div>
                <div className="skel-bar line-long"></div>
                <div className="skel-bar line-mid"></div>
                <div className="skel-bar line-short"></div>
                <div className="skel-pill blue"></div>
              </div>

              <div className="mock-grid-skel-row">
                <div className="skel-icon linkedin">
                  <LinkedinIcon size={10} color="#0284c7" />
                </div>
                <div className="skel-bar line-long"></div>
                <div className="skel-bar line-mid"></div>
                <div className="skel-bar line-short"></div>
                <div className="skel-pill gray"></div>
              </div>
            </div>

            {/* Headline */}
            <h2 className="tasks-empty-heading">You have no assigned tasks</h2>

            {/* Learn More Link */}
            <div className="tasks-learn-more-row">
              <a 
                href="#/app/engage/tasks" 
                onClick={(e) => {
                  e.preventDefault();
                  showToast('Opening Tasks Documentation & Help Guide...');
                }}
                className="learn-more-link"
              >
                <div className="info-circle-icon">?</div>
                <span>Learn more about tasks</span>
              </a>
            </div>

            {/* Action Buttons Row (1:1 Match to Screenshot) */}
            <div className="tasks-action-buttons-row">
              <button 
                className="view-team-tasks-btn"
                onClick={() => showToast('Viewing Team Tasks Workspace')}
              >
                View all team tasks
              </button>

              <button 
                className="new-task-yellow-btn"
                onClick={handleOpenCreate}
              >
                New task
              </button>
            </div>

          </div>
        ) : (
          /* ── ACTIVE TASKS TABLE VIEW ── */
          <div className="active-tasks-table-container">
            <div className="exact-apollo-table-card">
              <table className="exact-apollo-table">
                <thead>
                  <tr>
                    <th style={{ width: 40 }}>STATUS</th>
                    <th>TASK NAME</th>
                    <th>CONTACT</th>
                    <th>TASK SOURCE</th>
                    <th>DUE DATE</th>
                    <th>PRIORITY</th>
                    <th style={{ textAlign: 'right' }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTasks.map(item => (
                    <tr key={item.id} className={`exact-row ${item.completed ? 'task-completed-row' : ''}`}>
                      <td>
                        <button 
                          className={`task-check-circle-btn ${item.completed ? 'checked' : ''}`}
                          onClick={(e) => toggleCompleteTask(item.id, e)}
                          title={item.completed ? 'Mark incomplete' : 'Complete task'}
                        >
                          {item.completed ? <Check size={12} color="#ffffff" /> : null}
                        </button>
                      </td>
                      <td>
                        <div className="task-title-cell">
                          <span className={`type-icon-badge ${item.type}`}>
                            {item.type === 'email' && <Mail size={14} color="#2563eb" />}
                            {item.type === 'call' && <Phone size={14} color="#059669" />}
                            {item.type === 'linkedin' && <LinkedinIcon size={14} color="#0284c7" />}
                          </span>
                          <span className="task-title-text">{item.title}</span>
                        </div>
                      </td>
                      <td>
                        <div className="contact-details-cell">
                          <strong className="contact-name">{item.contact}</strong>
                          <span className="contact-comp">{item.company}</span>
                        </div>
                      </td>
                      <td><span className="sequence-tag-pill">{item.sequence}</span></td>
                      <td><span className="due-date-text">{item.dueDate}</span></td>
                      <td>
                        <span className={`priority-badge ${item.priority.toLowerCase()}`}>
                          {item.priority}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <button 
                          className="table-action-icon-btn danger"
                          onClick={(e) => {
                            e.stopPropagation();
                            setTasksList(prev => prev.filter(t => t.id !== item.id));
                            showToast(`Deleted task "${item.title}"`);
                          }}
                        >
                          <Trash2 size={14} color="#ef4444" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ── FLOATING HELP QUESTION MARK BUTTON (1:1 SCREENSHOT) ── */}
      <button 
        className="tasks-floating-help-btn"
        title="Help & Documentation"
        onClick={() => showToast('Opening Tasks Help Documentation...')}
      >
        <span className="help-question-mark">?</span>
      </button>

      {/* ── 1:1 NEW TASK POPUP MODAL (MATCHING EXACT USER FIELDS) ── */}
      {createModalOpen && (
        <div className="task-modal-backdrop" onClick={() => setCreateModalOpen(false)}>
          <div className="task-modal-card" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="task-modal-header">
              <h2 className="task-modal-title">New task</h2>
              <button className="task-modal-close" onClick={() => setCreateModalOpen(false)}>
                <X size={18} color="#71717a" />
              </button>
            </div>

            {/* Form Body */}
            <div className="task-modal-body">
              {/* Associated with */}
              <div className="task-form-group">
                <label className="task-form-label">Associated with</label>
                <select 
                  className="task-form-select"
                  value={taskContact}
                  onChange={(e) => setTaskContact(e.target.value)}
                >
                  <option value="">Select...</option>
                  <option value="Chloe Kim">Chloe Kim (VP of Marketing)</option>
                  <option value="Matt Curl">Matt Curl (CEO & Founder)</option>
                  <option value="Sarah Jenkins">Sarah Jenkins (VP of Sales)</option>
                </select>
              </div>

              {/* Type */}
              <div className="task-form-group">
                <label className="task-form-label">Type</label>
                <div className="task-type-pills-row">
                  <button 
                    type="button"
                    className={`task-type-pill ${taskType === 'call' ? 'active' : ''}`}
                    onClick={() => setTaskType('call')}
                  >
                    <Phone size={14} /> Call
                  </button>
                  <button 
                    type="button"
                    className={`task-type-pill ${taskType === 'email' ? 'active' : ''}`}
                    onClick={() => setTaskType('email')}
                  >
                    <Mail size={14} /> Email
                  </button>
                  <button 
                    type="button"
                    className={`task-type-pill ${taskType === 'linkedin' ? 'active' : ''}`}
                    onClick={() => setTaskType('linkedin')}
                  >
                    <LinkedinIcon size={14} /> LinkedIn
                  </button>
                </div>
              </div>

              {/* Title */}
              <div className="task-form-group">
                <label className="task-form-label required">Title</label>
                <input 
                  type="text" 
                  className={`task-form-input ${nameError && !taskName.trim() ? 'error' : ''}`}
                  placeholder="Enter title" 
                  value={taskName}
                  onChange={(e) => {
                    setTaskName(e.target.value);
                    if (e.target.value.trim()) setNameError(false);
                  }}
                  autoFocus
                />
                {nameError && !taskName.trim() && (
                  <span className="task-form-error-text">Title is required.</span>
                )}
              </div>

              {/* Description */}
              <div className="task-form-group">
                <div className="task-form-label-row">
                  <label className="task-form-label">Description</label>
                  <button 
                    type="button"
                    className="task-add-snippet-btn"
                    onClick={() => showToast('Opening Snippets Selector...')}
                  >
                    + Add snippet
                  </button>
                </div>
                <textarea 
                  className="task-form-textarea"
                  placeholder="Add description"
                  rows={3}
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                />
              </div>

              {/* Due date & Due time Grid */}
              <div className="task-form-row-grid">
                <div className="task-form-group">
                  <label className="task-form-label">Due date</label>
                  <input 
                    type="date"
                    className="task-form-input"
                    value={taskDueDate}
                    onChange={(e) => setTaskDueDate(e.target.value)}
                  />
                </div>

                <div className="task-form-group">
                  <label className="task-form-label">Due time</label>
                  <input 
                    type="text"
                    className="task-form-input"
                    placeholder="04:54 PM"
                    value={taskDueTime}
                    onChange={(e) => setTaskDueTime(e.target.value)}
                  />
                </div>
              </div>

              {/* Priority */}
              <div className="task-form-group">
                <label className="task-form-label">Priority</label>
                <div className="task-priority-pills-row">
                  {['medium', 'high', 'low'].map(p => (
                    <button 
                      key={p}
                      type="button"
                      className={`task-priority-pill ${taskPriority.toLowerCase() === p ? 'active' : ''}`}
                      onClick={() => setTaskPriority(p)}
                    >
                      {p.charAt(0).toUpperCase() + p.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Assignee */}
              <div className="task-form-group">
                <label className="task-form-label">Assignee</label>
                <div className="task-assignee-select-wrap">
                  <User size={15} color="#71717a" />
                  <select 
                    className="task-form-select assignee"
                    value={taskAssignee}
                    onChange={(e) => setTaskAssignee(e.target.value)}
                  >
                    <option value="6a9f9e61385fc70018306909">Akriti Kushwaha (You)</option>
                    <option value="team-member-1">Abhishek Kumar (Admin)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="task-modal-footer">
              <button 
                type="button"
                className="task-modal-cancel-btn" 
                onClick={() => setCreateModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                type="button"
                className="task-modal-create-btn"
                onClick={handleCreateTask}
              >
                Create task
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
