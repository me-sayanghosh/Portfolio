import React, { useState, useEffect } from 'react';
import { 
  LogOut, Plus, Trash2, Edit, Check, AlertCircle, 
  BookOpen, FolderGit2, MessageSquare, Settings, 
  Download, Upload, ShieldCheck, RefreshCw 
} from 'lucide-react';
import styles from './AdminDashboard.module.css';

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('blogs');
  
  // Dynamic lists from localStorage
  const [blogs, setBlogs] = useState([]);
  const [projects, setProjects] = useState([]);
  const [signatures, setSignatures] = useState([]);
  
  // Settings / Admin key state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState(null); // { type: 'success'|'error', text: string }

  // Action status/notifications
  const [notify, setNotify] = useState(null); // { type: 'success'|'error', text: string }

  // Form Editor States
  const [editingBlog, setEditingBlog] = useState(null); // null (list) or blog object or 'new'
  const [editingProject, setEditingProject] = useState(null); // null (list) or project object or 'new'

  // Form Fields - Blogs
  const [blogTitle, setBlogTitle] = useState('');
  const [blogCategory, setBlogCategory] = useState('UI/UX & Creative');
  const [blogSnippet, setBlogSnippet] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogAccent, setBlogAccent] = useState('#f15a24');

  // Form Fields - Projects
  const [projectTitle, setProjectTitle] = useState('');
  const [projectCategory, setProjectCategory] = useState('Full-Stack');
  const [projectTagline, setProjectTagline] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectAccent, setProjectAccent] = useState('#f15a24');
  const [projectLiveLink, setProjectLiveLink] = useState('');
  const [projectGitLink, setProjectGitLink] = useState('');
  const [projectImage, setProjectImage] = useState('');
  const [techList, setTechList] = useState(''); // comma-separated tags

  // Fetch all lists from localStorage
  const loadDatabase = () => {
    // Blogs
    const storedBlogs = localStorage.getItem('sayan_portfolio_blogs');
    if (storedBlogs) setBlogs(JSON.parse(storedBlogs));
    
    // Projects
    const storedProjects = localStorage.getItem('sayan_portfolio_projects');
    if (storedProjects) setProjects(JSON.parse(storedProjects));
    
    // Signatures
    const storedSigs = localStorage.getItem('sayan_guestbook_signatures');
    if (storedSigs) setSignatures(JSON.parse(storedSigs));
  };

  useEffect(() => {
    loadDatabase();
  }, []);

  const triggerNotification = (type, text) => {
    setNotify({ type, text });
    setTimeout(() => setNotify(null), 4000);
  };

  // --- BLOG OPERATIONS ---
  const handleNewBlog = () => {
    setEditingBlog('new');
    setBlogTitle('');
    setBlogCategory('UI/UX & Creative');
    setBlogSnippet('');
    setBlogContent('');
    setBlogAccent('#f15a24');
  };

  const handleEditBlog = (blog) => {
    setEditingBlog(blog);
    setBlogTitle(blog.title);
    setBlogCategory(blog.category);
    setBlogSnippet(blog.snippet);
    setBlogContent(blog.content);
    setBlogAccent(blog.accent || '#f15a24');
  };

  const handleSaveBlog = (e) => {
    e.preventDefault();
    if (!blogTitle.trim() || !blogSnippet.trim() || !blogContent.trim()) {
      triggerNotification('error', 'All core fields are required.');
      return;
    }

    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    const dateStr = new Date().toLocaleDateString('en-US', options);
    
    // Calculate reading time roughly: 200 words per minute
    const wordCount = blogContent.trim().split(/\s+/).length;
    const readTimeMin = Math.max(1, Math.ceil(wordCount / 200));

    // Accent glows mapping
    const glowColor = blogAccent.startsWith('#') 
      ? hexToRgbA(blogAccent, 0.15) 
      : 'rgba(241, 90, 36, 0.15)';

    const storedBlogs = JSON.parse(localStorage.getItem('sayan_portfolio_blogs') || '[]');

    if (editingBlog === 'new') {
      const newPost = {
        id: Date.now(),
        title: blogTitle.trim(),
        category: blogCategory,
        date: dateStr,
        readTime: `${readTimeMin} min read`,
        snippet: blogSnippet.trim(),
        accent: blogAccent,
        glow: glowColor,
        content: blogContent.trim()
      };
      const updated = [newPost, ...storedBlogs];
      localStorage.setItem('sayan_portfolio_blogs', JSON.stringify(updated));
      triggerNotification('success', 'Blog post created successfully!');
    } else {
      const updated = storedBlogs.map(b => {
        if (b.id === editingBlog.id) {
          return {
            ...b,
            title: blogTitle.trim(),
            category: blogCategory,
            readTime: `${readTimeMin} min read`,
            snippet: blogSnippet.trim(),
            accent: blogAccent,
            glow: glowColor,
            content: blogContent.trim()
          };
        }
        return b;
      });
      localStorage.setItem('sayan_portfolio_blogs', JSON.stringify(updated));
      triggerNotification('success', 'Blog post updated successfully!');
    }

    setEditingBlog(null);
    loadDatabase();
  };

  const handleDeleteBlog = (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      const storedBlogs = JSON.parse(localStorage.getItem('sayan_portfolio_blogs') || '[]');
      const updated = storedBlogs.filter(b => b.id !== id);
      localStorage.setItem('sayan_portfolio_blogs', JSON.stringify(updated));
      loadDatabase();
      triggerNotification('success', 'Blog post deleted.');
    }
  };

  // Helper utility for generating accent glow from hex
  function hexToRgbA(hex, alpha) {
    let c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split('');
      if (c.length === 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = '0x' + c.join('');
      return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + alpha + ')';
    }
    return 'rgba(241, 90, 36, 0.15)';
  }

  // --- PROJECT OPERATIONS ---
  const handleNewProject = () => {
    setEditingProject('new');
    setProjectTitle('');
    setProjectCategory('Full-Stack');
    setProjectTagline('');
    setProjectDescription('');
    setProjectAccent('#f15a24');
    setProjectLiveLink('');
    setProjectGitLink('');
    setProjectImage('');
    setTechList('');
  };

  const handleEditProject = (proj) => {
    setEditingProject(proj);
    setProjectTitle(proj.title);
    setProjectCategory(proj.category || 'Full-Stack');
    setProjectTagline(proj.tagline || '');
    setProjectDescription(proj.description || '');
    setProjectAccent(proj.accent || '#f15a24');
    setProjectLiveLink(proj.liveLink || '');
    setProjectGitLink(proj.gitLink || '');
    setProjectImage(proj.image || '');
    
    // Flatten technology categories to single tags list
    const tags = proj.tech ? Object.values(proj.tech).flat().join(', ') : '';
    setTechList(tags);
  };

  const handleSaveProject = (e) => {
    e.preventDefault();
    if (!projectTitle.trim() || !projectDescription.trim()) {
      triggerNotification('error', 'Project Title and Description are required.');
      return;
    }

    const glowColor = projectAccent.startsWith('#')
      ? hexToRgbA(projectAccent, 0.22)
      : 'rgba(241, 90, 36, 0.22)';

    // Compile tech object
    const tagsArr = techList.split(',').map(s => s.trim()).filter(s => s !== '');
    const techObj = {
      frontend: tagsArr.slice(0, 3),
      backend: tagsArr.slice(3, 6),
      services: tagsArr.slice(6)
    };

    const storedProjects = JSON.parse(localStorage.getItem('sayan_portfolio_projects') || '[]');

    if (editingProject === 'new') {
      const newProj = {
        title: projectTitle.trim(),
        category: projectCategory,
        tagline: projectTagline.trim(),
        description: projectDescription.trim(),
        accent: projectAccent,
        glow: glowColor,
        image: projectImage.trim() || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600', // fallback
        tech: techObj,
        liveLink: projectLiveLink.trim(),
        gitLink: projectGitLink.trim()
      };
      const updated = [newProj, ...storedProjects];
      localStorage.setItem('sayan_portfolio_projects', JSON.stringify(updated));
      triggerNotification('success', 'Project created successfully!');
    } else {
      const updated = storedProjects.map(p => {
        // Match by title (primary key in mock data)
        if (p.title === editingProject.title) {
          return {
            ...p,
            title: projectTitle.trim(),
            category: projectCategory,
            tagline: projectTagline.trim(),
            description: projectDescription.trim(),
            accent: projectAccent,
            glow: glowColor,
            image: projectImage.trim() || p.image,
            tech: techObj,
            liveLink: projectLiveLink.trim(),
            gitLink: projectGitLink.trim()
          };
        }
        return p;
      });
      localStorage.setItem('sayan_portfolio_projects', JSON.stringify(updated));
      triggerNotification('success', 'Project updated successfully!');
    }

    setEditingProject(null);
    loadDatabase();
  };

  // Base64 Image Uploader Helper
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Limit to 500KB to prevent localStorage overflow
    if (file.size > 500 * 1024) {
      triggerNotification('error', 'Image size exceeds 500KB. Please compress it.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setProjectImage(reader.result);
      triggerNotification('success', 'Image uploaded & encoded successfully!');
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteProject = (title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      const storedProjects = JSON.parse(localStorage.getItem('sayan_portfolio_projects') || '[]');
      const updated = storedProjects.filter(p => p.title !== title);
      localStorage.setItem('sayan_portfolio_projects', JSON.stringify(updated));
      loadDatabase();
      triggerNotification('success', 'Project deleted.');
    }
  };

  // --- GUESTBOOK OPERATIONS ---
  const handleDeleteSignature = (id) => {
    if (window.confirm('Delete this visitor comment? This cannot be undone.')) {
      const stored = JSON.parse(localStorage.getItem('sayan_guestbook_signatures') || '[]');
      const updated = stored.filter(s => s.id !== id);
      localStorage.setItem('sayan_guestbook_signatures', JSON.stringify(updated));
      loadDatabase();
      triggerNotification('success', 'Visitor signature deleted.');
    }
  };

  // --- SETTINGS: PASSWORD & BACKUP ---
  const handleChangePassword = (e) => {
    e.preventDefault();
    setPasswordStatus(null);

    if (newPassword.length < 5) {
      setPasswordStatus({ type: 'error', text: 'Password must be at least 5 characters.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordStatus({ type: 'error', text: 'Passwords do not match.' });
      return;
    }

    localStorage.setItem('sayan_admin_password', newPassword);
    setPasswordStatus({ type: 'success', text: 'Admin passcode updated successfully.' });
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleExportDB = () => {
    const db = {
      blogs: JSON.parse(localStorage.getItem('sayan_portfolio_blogs') || '[]'),
      projects: JSON.parse(localStorage.getItem('sayan_portfolio_projects') || '[]'),
      signatures: JSON.parse(localStorage.getItem('sayan_guestbook_signatures') || '[]')
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(db, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `portfolio_db_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    triggerNotification('success', 'Database backup downloaded.');
  };

  const handleImportDB = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const db = JSON.parse(event.target.result);
        
        if (db.blogs && db.projects && db.signatures) {
          localStorage.setItem('sayan_portfolio_blogs', JSON.stringify(db.blogs));
          localStorage.setItem('sayan_portfolio_projects', JSON.stringify(db.projects));
          localStorage.setItem('sayan_guestbook_signatures', JSON.stringify(db.signatures));
          loadDatabase();
          triggerNotification('success', 'Database successfully restored!');
        } else {
          triggerNotification('error', 'Invalid file structure. Make sure keys match.');
        }
      } catch (err) {
        triggerNotification('error', 'Failed to parse JSON backup.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Header bar */}
      <header className={styles.header}>
        <div className={styles.logoBlock}>
          <ShieldCheck size={20} className={styles.shieldIcon} />
          <div>
            <h1 className={styles.dashboardTitle}>Superadmin Control Center</h1>
            <span className={styles.subTitle}>Sayan Ghosh Portfolio System</span>
          </div>
        </div>

        <button onClick={onLogout} className={styles.logoutBtn}>
          <span>Disconnect</span>
          <LogOut size={14} />
        </button>
      </header>

      {/* Grid Layout */}
      <div className={styles.layout}>
        {/* Navigation Sidebar */}
        <aside className={styles.sidebar}>
          <nav className={styles.nav}>
            <button 
              onClick={() => { setActiveTab('blogs'); setEditingBlog(null); }}
              className={`${styles.navBtn} ${activeTab === 'blogs' ? styles.activeNavBtn : ''}`}
            >
              <BookOpen size={16} />
              <span>Manage Blogs</span>
              <span className={styles.badgeCount}>{blogs.length}</span>
            </button>

            <button 
              onClick={() => { setActiveTab('projects'); setEditingProject(null); }}
              className={`${styles.navBtn} ${activeTab === 'projects' ? styles.activeNavBtn : ''}`}
            >
              <FolderGit2 size={16} />
              <span>Manage Projects</span>
              <span className={styles.badgeCount}>{projects.length}</span>
            </button>

            <button 
              onClick={() => setActiveTab('guestbook')}
              className={`${styles.navBtn} ${activeTab === 'guestbook' ? styles.activeNavBtn : ''}`}
            >
              <MessageSquare size={16} />
              <span>Visitor Signatures</span>
              <span className={styles.badgeCount}>{signatures.length}</span>
            </button>

            <button 
              onClick={() => setActiveTab('settings')}
              className={`${styles.navBtn} ${activeTab === 'settings' ? styles.activeNavBtn : ''}`}
            >
              <Settings size={16} />
              <span>System Settings</span>
            </button>
          </nav>

          {/* Quick stats panel */}
          <div className={styles.statsPanel}>
            <span className={styles.panelTitle}>System Diagnostics</span>
            <div className={styles.statsRow}>
              <span>Status:</span>
              <span className={styles.statusOnline}>Synchronized</span>
            </div>
            <div className={styles.statsRow}>
              <span>DB Size:</span>
              <span>Local Storage Active</span>
            </div>
          </div>
        </aside>

        {/* Main Console view */}
        <main className={styles.console}>
          {notify && (
            <div className={`${styles.notification} ${styles[notify.type]}`}>
              {notify.type === 'success' ? <Check size={16} /> : <AlertCircle size={16} />}
              <span>{notify.text}</span>
            </div>
          )}

          {/* BLOGS MANAGEMENT TAB */}
          {activeTab === 'blogs' && (
            <div className={styles.pane}>
              {editingBlog === null ? (
                <>
                  <div className={styles.paneHeader}>
                    <h2>Active Blog Publications</h2>
                    <button onClick={handleNewBlog} className={styles.btnPrimary}>
                      <Plus size={14} />
                      <span>Write Post</span>
                    </button>
                  </div>

                  <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Category</th>
                          <th>Date</th>
                          <th>Length</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {blogs.length === 0 ? (
                          <tr>
                            <td colSpan="5" className={styles.emptyCell}>No blog publications found. Create one to get started!</td>
                          </tr>
                        ) : (
                          blogs.map(blog => (
                            <tr key={blog.id}>
                              <td className={styles.boldCell}>{blog.title}</td>
                              <td><span className={styles.tableCategory}>{blog.category}</span></td>
                              <td>{blog.date}</td>
                              <td>{blog.readTime}</td>
                              <td>
                                <div className={styles.actionGroup}>
                                  <button onClick={() => handleEditBlog(blog)} className={styles.editBtn} title="Edit">
                                    <Edit size={14} />
                                  </button>
                                  <button onClick={() => handleDeleteBlog(blog.id)} className={styles.deleteBtn} title="Delete">
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.paneHeader}>
                    <h2>{editingBlog === 'new' ? 'Compose New Blog Post' : 'Modify Blog Publication'}</h2>
                    <button onClick={() => setEditingBlog(null)} className={styles.btnSecondary}>
                      Cancel
                    </button>
                  </div>

                  <form onSubmit={handleSaveBlog} className={styles.formContainer}>
                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}>
                        <label className={styles.label}>Post Title</label>
                        <input 
                          type="text" 
                          value={blogTitle} 
                          onChange={(e) => setBlogTitle(e.target.value)} 
                          className={styles.formInput} 
                          placeholder="e.g. The Architecture of WebSockets"
                          required
                        />
                      </div>
                      
                      <div className={styles.formGroup}>
                        <label className={styles.label}>Category</label>
                        <select 
                          value={blogCategory} 
                          onChange={(e) => setBlogCategory(e.target.value)}
                          className={styles.formSelect}
                        >
                          <option value="UI/UX & Creative">UI/UX & Creative</option>
                          <option value="Web Performance">Web Performance</option>
                          <option value="Backend & Core">Backend & Core</option>
                        </select>
                      </div>
                    </div>

                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}>
                        <label className={styles.label}>Snippet / Brief Summary</label>
                        <input 
                          type="text" 
                          value={blogSnippet} 
                          onChange={(e) => setBlogSnippet(e.target.value)} 
                          className={styles.formInput} 
                          placeholder="Brief description displaying on the blog list card..."
                          required
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.label}>Theme Accent Color</label>
                        <div className={styles.colorPickerWrapper}>
                          <input 
                            type="color" 
                            value={blogAccent} 
                            onChange={(e) => setBlogAccent(e.target.value)} 
                            className={styles.colorPicker}
                          />
                          <input 
                            type="text" 
                            value={blogAccent} 
                            onChange={(e) => setBlogAccent(e.target.value)} 
                            className={styles.formInput} 
                            style={{ fontFamily: 'monospace' }}
                            placeholder="#f15a24"
                          />
                        </div>
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <div className={styles.labelLine}>
                        <label className={styles.label}>Markdown Content Body</label>
                        <span className={styles.helperText}>Supports GitHub Flavored Markdown (H1, H2, Code blocks)</span>
                      </div>
                      <textarea 
                        value={blogContent} 
                        onChange={(e) => setBlogContent(e.target.value)} 
                        className={styles.formTextarea} 
                        rows={14}
                        placeholder="# Title of Post&#10;&#10;Use markdown syntax for formatting..."
                        required
                      />
                    </div>

                    <button type="submit" className={styles.btnSave}>
                      <Check size={14} />
                      <span>{editingBlog === 'new' ? 'Publish Post' : 'Save Modifications'}</span>
                    </button>
                  </form>
                </>
              )}
            </div>
          )}

          {/* PROJECTS MANAGEMENT TAB */}
          {activeTab === 'projects' && (
            <div className={styles.pane}>
              {editingProject === null ? (
                <>
                  <div className={styles.paneHeader}>
                    <h2>Active Projects Dashboard</h2>
                    <button onClick={handleNewProject} className={styles.btnPrimary}>
                      <Plus size={14} />
                      <span>Add Project</span>
                    </button>
                  </div>

                  <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <th>Project Name</th>
                          <th>Category</th>
                          <th>Tagline</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {projects.length === 0 ? (
                          <tr>
                            <td colSpan="4" className={styles.emptyCell}>No projects found. Add one to display on portfolio!</td>
                          </tr>
                        ) : (
                          projects.map(proj => (
                            <tr key={proj.title}>
                              <td className={styles.boldCell}>{proj.title}</td>
                              <td><span className={styles.tableCategory}>{proj.category}</span></td>
                              <td>{proj.tagline}</td>
                              <td>
                                <div className={styles.actionGroup}>
                                  <button onClick={() => handleEditProject(proj)} className={styles.editBtn} title="Edit">
                                    <Edit size={14} />
                                  </button>
                                  <button onClick={() => handleDeleteProject(proj.title)} className={styles.deleteBtn} title="Delete">
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.paneHeader}>
                    <h2>{editingProject === 'new' ? 'Register New Project' : `Modify "${projectTitle}"`}</h2>
                    <button onClick={() => setEditingProject(null)} className={styles.btnSecondary}>
                      Cancel
                    </button>
                  </div>

                  <form onSubmit={handleSaveProject} className={styles.formContainer}>
                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}>
                        <label className={styles.label}>Project Name</label>
                        <input 
                          type="text" 
                          value={projectTitle} 
                          onChange={(e) => setProjectTitle(e.target.value)} 
                          className={styles.formInput} 
                          placeholder="e.g. PrepDost"
                          required
                          disabled={editingProject !== 'new'} // primary key in lists
                        />
                      </div>
                      
                      <div className={styles.formGroup}>
                        <label className={styles.label}>Category</label>
                        <select 
                          value={projectCategory} 
                          onChange={(e) => setProjectCategory(e.target.value)}
                          className={styles.formSelect}
                        >
                          <option value="Full-Stack">Full-Stack</option>
                          <option value="AI & Automation">AI & Automation</option>
                          <option value="UI/UX & Creative">UI/UX & Creative</option>
                        </select>
                      </div>
                    </div>

                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}>
                        <label className={styles.label}>Project Tagline</label>
                        <input 
                          type="text" 
                          value={projectTagline} 
                          onChange={(e) => setProjectTagline(e.target.value)} 
                          className={styles.formInput} 
                          placeholder="e.g. AI Mock Interview Platform"
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.label}>Accent Color</label>
                        <div className={styles.colorPickerWrapper}>
                          <input 
                            type="color" 
                            value={projectAccent} 
                            onChange={(e) => setProjectAccent(e.target.value)} 
                            className={styles.colorPicker}
                          />
                          <input 
                            type="text" 
                            value={projectAccent} 
                            onChange={(e) => setProjectAccent(e.target.value)} 
                            className={styles.formInput} 
                            style={{ fontFamily: 'monospace' }}
                            placeholder="#f15a24"
                          />
                        </div>
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>Description</label>
                      <textarea 
                        value={projectDescription} 
                        onChange={(e) => setProjectDescription(e.target.value)} 
                        className={styles.formTextarea} 
                        rows={4}
                        placeholder="Provide a detailed description of the project features, structure, and execution..."
                        required
                      />
                    </div>

                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}>
                        <label className={styles.label}>Live Demo URL</label>
                        <input 
                          type="url" 
                          value={projectLiveLink} 
                          onChange={(e) => setProjectLiveLink(e.target.value)} 
                          className={styles.formInput} 
                          placeholder="https://example.com"
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.label}>GitHub Repository URL</label>
                        <input 
                          type="url" 
                          value={projectGitLink} 
                          onChange={(e) => setProjectGitLink(e.target.value)} 
                          className={styles.formInput} 
                          placeholder="https://github.com/user/repo"
                        />
                      </div>
                    </div>

                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}>
                        <label className={styles.label}>Project Image / Illustration</label>
                        <input 
                          type="text" 
                          value={projectImage} 
                          onChange={(e) => setProjectImage(e.target.value)} 
                          className={styles.formInput} 
                          placeholder="Paste image URL (Unsplash/Imgur) or upload below"
                        />
                        <div className={styles.fileInputWrapper}>
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={handleImageUpload}
                            className={styles.fileInput}
                          />
                          <span className={styles.fileInputLabel}>Upload File (Max 500KB)</span>
                        </div>
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.label}>Technology Badge Tags</label>
                        <input 
                          type="text" 
                          value={techList} 
                          onChange={(e) => setTechList(e.target.value)} 
                          className={styles.formInput} 
                          placeholder="e.g. React.js, Express, MongoDB, OpenAI API"
                        />
                        <span className={styles.inputHelper}>Provide comma-separated values to render tags on your project card.</span>
                      </div>
                    </div>

                    <button type="submit" className={styles.btnSave}>
                      <Check size={14} />
                      <span>{editingProject === 'new' ? 'Register Project' : 'Save Specifications'}</span>
                    </button>
                  </form>
                </>
              )}
            </div>
          )}

          {/* GUESTBOOK SIGNATURES MODERATOR TAB */}
          {activeTab === 'guestbook' && (
            <div className={styles.pane}>
              <div className={styles.paneHeader}>
                <h2>Guestbook Comment Moderator</h2>
              </div>

              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Author</th>
                      <th>Date</th>
                      <th>Comment Message</th>
                      <th>Moderation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {signatures.length === 0 ? (
                      <tr>
                        <td colSpan="4" className={styles.emptyCell}>No visitor comments logged in guestbook database.</td>
                      </tr>
                    ) : (
                      signatures.map(sig => (
                        <tr key={sig.id}>
                          <td className={styles.boldCell}>
                            <div className={styles.avatarCell}>
                              <span 
                                className={styles.miniAvatar} 
                                style={{ background: sig.avatarColor }}
                              >
                                {sig.name.charAt(0).toUpperCase()}
                              </span>
                              <span>{sig.name}</span>
                            </div>
                          </td>
                          <td style={{ whiteSpace: 'nowrap' }}>{sig.date}</td>
                          <td className={styles.messageCell}>{sig.message}</td>
                          <td>
                            <button 
                              onClick={() => handleDeleteSignature(sig.id)} 
                              className={styles.deleteBtn}
                              title="Delete Signature"
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SYSTEM SETTINGS & JSON DATA TAB */}
          {activeTab === 'settings' && (
            <div className={styles.pane}>
              <div className={styles.paneHeader}>
                <h2>System Controls & Database Utilities</h2>
              </div>

              <div className={styles.settingsGrid}>
                {/* Security Passcode */}
                <div className={styles.settingsCard}>
                  <h3>Update Administrative Access Key</h3>
                  <p className={styles.settingsDesc}>
                    Change the password required to establish link session controls with the superadmin dashboard.
                  </p>
                  
                  <form onSubmit={handleChangePassword} className={styles.settingsForm}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>New Master Key</label>
                      <input 
                        type="password" 
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="ENTER NEW MASTER KEY"
                        className={styles.formInput}
                        required
                      />
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Confirm Key</label>
                      <input 
                        type="password" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="RE-ENTER TO CONFIRM"
                        className={styles.formInput}
                        required
                      />
                    </div>

                    {passwordStatus && (
                      <div className={`${styles.statusMessage} ${styles[passwordStatus.type]}`}>
                        <span>{passwordStatus.text}</span>
                      </div>
                    )}

                    <button type="submit" className={styles.btnPrimary} style={{ marginTop: '0.5rem' }}>
                      Update Key
                    </button>
                  </form>
                </div>

                {/* DB Backup Utilities */}
                <div className={styles.settingsCard}>
                  <h3>Backup & Restoration Node</h3>
                  <p className={styles.settingsDesc}>
                    Because the portfolio operates client-side dynamically, clear your browser cookies will wipe database configurations. Use JSON nodes to export and restore complete records.
                  </p>

                  <div className={styles.backupGroup}>
                    <button onClick={handleExportDB} className={styles.btnSecondaryWide}>
                      <Download size={15} />
                      <span>Export JSON Database</span>
                    </button>

                    <div className={styles.divider}>
                      <span>OR</span>
                    </div>

                    <div className={styles.importWrapper}>
                      <button className={styles.btnPrimaryWide}>
                        <Upload size={15} />
                        <span>Restore JSON Database</span>
                      </button>
                      <input 
                        type="file" 
                        accept=".json"
                        onChange={handleImportDB}
                        className={styles.importFileField}
                      />
                    </div>
                    <span className={styles.importHelper}>Upload a previously exported `.json` file to override and restore records.</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
