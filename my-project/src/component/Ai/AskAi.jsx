import React, { useState, useRef } from "react";
import "./AskAi.css";

const AskAi = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi 👋 I'm KUKU. Ask me anything about exams, concepts, or doubts!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isUploadMenuOpen, setIsUploadMenuOpen] = useState(false);
  
  const fileInputRef = useRef(null);
  const API_KEY = "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";

  const features = [
    {
      icon: "📚",
      title: "Exam Preparation",
      description: "Get help with exam questions, practice tests, and study strategies"
    },
    {
      icon: "💡",
      title: "Concept Clarification",
      description: "Understand complex topics with simple explanations and examples"
    },
    {
      icon: "⚡",
      title: "24/7 Availability",
      description: "Instant help anytime, anywhere with quick and accurate responses"
    },
    {
      icon: "🎯",
      title: "Personalized Learning",
      description: "Tailored explanations based on your learning style and level"
    }
  ];

  // Handle file upload
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter(file => {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} is too large. Maximum size is 5MB.`);
        return false;
      }
      
      // Check file type
      const validTypes = [
        'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp',
        'application/pdf', 
        'application/msword', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation'
      ];
      
      if (!validTypes.includes(file.type)) {
        alert(`${file.name} has an unsupported file type.`);
        return false;
      }
      
      return true;
    });
    
    setUploadedFiles(prev => [...prev, ...validFiles.map(file => ({
      file,
      id: Date.now() + Math.random(),
      name: file.name,
      type: file.type,
      size: (file.size / 1024 / 1024).toFixed(2) + 'MB',
      uploadedAt: new Date().toLocaleTimeString()
    }))]);
    
    // Reset file input
    event.target.value = null;
  };

  // Remove uploaded file
  const handleRemoveFile = (id) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id));
  };

  // Trigger file input click
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  // Get file icon based on type
  const getFileIcon = (type) => {
    if (type.startsWith('image/')) return '🖼️';
    if (type === 'application/pdf') return '📄';
    if (type.includes('word') || type.includes('document')) return '📝';
    if (type.includes('excel') || type.includes('spreadsheet')) return '📊';
    if (type.includes('powerpoint') || type.includes('presentation')) return '📑';
    if (type === 'text/plain') return '📃';
    return '📎';
  };

  // Copy message to clipboard with visual feedback
  const handleCopy = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => {
        setCopiedIndex(null);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
      setCopiedIndex(index);
      setTimeout(() => {
        setCopiedIndex(null);
      }, 2000);
    }
  };

  // Start editing a message
  const handleEdit = (index, content) => {
    setEditingIndex(index);
    setEditText(content);
    setInput(content);
  };

  // Save edited message
  const handleSaveEdit = (index) => {
    if (editText.trim()) {
      setMessages(prev => prev.map((msg, i) => 
        i === index ? { ...msg, content: editText } : msg
      ));
    }
    setEditingIndex(null);
    setEditText("");
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditText("");
  };

  // Delete a message
  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      setMessages(prev => prev.filter((_, i) => i !== index));
    }
  };

  // Resend edited message
  const handleResend = (content) => {
    setInput(content);
    setTimeout(() => {
      handleSend();
    }, 100);
  };

  const handleSend = async () => {
    if (!input.trim() && uploadedFiles.length === 0) return;

    let userMessage = { role: "user", content: input };
    
    // Add file information if files are uploaded
    if (uploadedFiles.length > 0) {
      const fileInfo = uploadedFiles.map(f => 
        `[${getFileIcon(f.type)} ${f.name} (${f.size})]`
      ).join(' ');
      userMessage.content = input ? 
        `${input}\n\n📎 Attachments: ${fileInfo}` : 
        `📎 Attachments: ${fileInfo}`;
    }

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setUploadedFiles([]);
    setLoading(true);

    try {
      const response = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4.1-mini",
          input: userMessage.content,
        }),
      });

      const data = await response.json();
      let aiReply = "No response generated.";

      if (
        data.output &&
        data.output[0] &&
        data.output[0].content &&
        data.output[0].content[0] &&
        data.output[0].content[0].text
      ) {
        aiReply = data.output[0].content[0].text;
      }

      setMessages((prev) => [...prev, { role: "assistant", content: aiReply }]);
    } catch (error) {
      console.error("API Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "⚠️ Network/API error. Please try again.",
        },
      ]);
    }

    setLoading(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    setMessages([
      { role: "assistant", content: "Hi 👋 I'm KUKU. Ask me anything about exams, concepts, or doubts!" },
    ]);
    setCopiedIndex(null);
    setUploadedFiles([]);
    setIsUploadMenuOpen(false);
  };

  if (!isOpen) {
    return (
      <div className="ai-page-container">
        {/* Hero Section */}
        <div className="ai-hero-section">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-text">Powered by Sarkari@Prep</span>
            </div>
            <h1 className="hero-title">
              Your Personal <span className="gradient-text">AI Learning</span> Assistant
            </h1>
            <p className="hero-subtitle">
              Stuck on a problem? Confused by a concept? 🐥 is here to help! 
              Our intelligent tutor provides clear explanations, study tips, and 
              homework assistance that grows with you – making learning effective 
              and enjoyable.
            </p>
            
            <button 
              className="hero-cta-btn"
              onClick={() => setIsOpen(true)}
            >
              <span className="cta-icon">🚀</span>
              Start Chat with KUKU
            </button>
          </div>
          
          <div className="hero-visual">
            <div className="ai-visual-container">
              <div className="pulse-ring"></div>
              <div className="pulse-ring delay-1"></div>
              <div className="pulse-ring delay-2"></div>
              <div className="ai-central-icon">
                <div className="ai-icon-inner">
                  <span className="ai-icon">?</span>
                </div>
              </div>
              <div className="floating-element element-1">📚</div>
              <div className="floating-element element-2">💡</div>
              <div className="floating-element element-3">⚡</div>
              <div className="floating-element element-4">🎯</div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="ai-features-section">
          <h2 className="features-title">How 🐥 Can Help You</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Chat Button */}
        <div className="chatbot-launcher">
          <button 
            className="chatbot-open-btn"
            onClick={() => setIsOpen(true)}
            title="KUKU AI Assistant "
          >
            <span className="chatbot-icon">🐥</span>
            <span className="chatbot-badge"></span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="askai-fullscreen">
      <div className="askai-container">
        <div className="askai-header">
          <div className="header-left">
            <div className="ai-avatar">🐥</div>
            <div className="header-info">
              <h2>KUKU AI Assistant</h2>
              <p>Powered by Sarkari@Prep E-Learning</p>
            </div>
          </div>
          <button className="close-btn" onClick={handleClose}>
            ✕
          </button>
        </div>

        <div className="askai-chat">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chat-message ${msg.role === "user" ? "user-message" : "ai-message"}`}
            >
              {editingIndex === index ? (
                <div className="edit-mode">
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="edit-textarea"
                    rows="3"
                    autoFocus
                  />
                  <div className="edit-actions">
                    <button 
                      className="edit-save-btn"
                      onClick={() => handleSaveEdit(index)}
                    >
                      Save
                    </button>
                    <button 
                      className="edit-cancel-btn"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="message-content">
                    {msg.content}
                  </div>
                  <div className="message-footer">
                    <div className="message-time">
                      {msg.role === "user" ? "You" : "KUKU AI"}
                    </div>
                    <div className="message-actions">
                      {msg.role === "user" && (
                        <>
                          <button 
                            className="message-action-btn edit-btn"
                            onClick={() => handleEdit(index, msg.content)}
                            title="Edit message"
                          >
                            ✏️ Edit
                          </button>
                          <button 
                            className="message-action-btn resend-btn"
                            onClick={() => handleResend(msg.content)}
                            title="Resend message"
                          >
                            🔄 Resend
                          </button>
                        </>
                      )}
                      <button 
                        className={`message-action-btn ${copiedIndex === index ? 'copy-success' : 'copy-btn'}`}
                        onClick={() => handleCopy(msg.content, index)}
                        title={copiedIndex === index ? "Copied!" : "Copy to clipboard"}
                      >
                        {copiedIndex === index ? " Copied" : "📋 Copy"}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
          {loading && (
            <div className="chat-message ai-message">
              <div className="message-content typing">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </div>
          )}
        </div>

        {/* Uploaded Files Preview */}
        {uploadedFiles.length > 0 && (
          <div className="uploaded-files-preview">
            <div className="files-preview-header">
              <span className="files-count">
                📎 {uploadedFiles.length} file{uploadedFiles.length > 1 ? 's' : ''} attached
              </span>
              <button 
                className="clear-all-btn"
                onClick={() => setUploadedFiles([])}
                title="Remove all files"
              >
                Clear all
              </button>
            </div>
            <div className="files-list">
              {uploadedFiles.map((file) => (
                <div key={file.id} className="file-item">
                  <span className="file-icon">{getFileIcon(file.type)}</span>
                  <div className="file-info">
                    <span className="file-name">{file.name}</span>
                    <span className="file-size">{file.size}</span>
                  </div>
                  <button 
                    className="remove-file-btn"
                    onClick={() => handleRemoveFile(file.id)}
                    title="Remove file"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="askai-input-area">
          <div className="input-wrapper">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              multiple
              accept="image/*,.pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx"
              style={{ display: 'none' }}
            />
            
            <div className="input-controls">
              <button 
                className="upload-btn"
                onClick={handleUploadClick}
                title="Upload files"
              >
                ⎘

              </button>
              
              <input
                type="text"
                placeholder="Ask anything about exams, concepts, doubts..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                disabled={loading}
                className="text-input"
              />
              
              <button 
                onClick={handleSend} 
                disabled={loading || (!input.trim() && uploadedFiles.length === 0)}
                className="send-btn"
              >
                {loading ? (
                  <span className="spinner"></span>
                ) : (
                  <span className="send-icon">➤</span>
                )}
              </button>
            </div>
          </div>
          {/* <div className="file-formats-info">
            <small>Supports: Images, PDF, DOC, TXT, Excel, PowerPoint (Max 5MB each)</small>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AskAi;