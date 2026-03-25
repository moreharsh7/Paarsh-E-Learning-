import React, { useState, useEffect, useRef } from 'react';
import {
  Clipboard,
  Search,
  Grid,
  List,
  Loader2,
  Calendar,
  Clock,
  FileText,
  Upload,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  X,
  Video,
  FileUp,
  Cloud,
  Trash2,
  Plus,
  Eye,
  Award,
  MessageCircle,
  AlertTriangle,
  PlayCircle,
  Link,
  Camera,
  Mic,
  Zap,
  Lock,
  Shield,
  BarChart3,
  Target,
  FileCheck,
  Users,
  BookOpen,
  CalendarDays
} from 'lucide-react';
import { assignmentService } from '../services/assignmentService';

const AssignmentsPage = () => {
  const [loading, setLoading] = useState(true);
  const [assignments, setAssignments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedView, setExpandedView] = useState('grid');
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    submitted: 0,
    graded: 0,
    averageScore: 0
  });

  // Fetch data
  useEffect(() => {
    fetchAssignmentsData();
  }, []);

  const fetchAssignmentsData = async () => {
    try {
      setLoading(true);
      const data = await assignmentService.getStudentAssignments();
      setAssignments(data || []);
      calculateStats(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (assignmentsData) => {
    const total = assignmentsData.length;
    const pending = assignmentsData.filter(a => !a.submittedAt).length;
    const submitted = assignmentsData.filter(a => a.submittedAt && !a.score).length;
    const graded = assignmentsData.filter(a => a.score).length;
    
    const gradedAssignments = assignmentsData.filter(a => a.score);
    const averageScore = gradedAssignments.length > 0 
      ? Math.round(gradedAssignments.reduce((sum, a) => sum + a.score, 0) / gradedAssignments.length)
      : 0;

    setStats({ total, pending, submitted, graded, averageScore });
  };

  const filteredAssignments = assignments.filter(a =>
    a.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.courseName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const ProgressBar = ({ value, color = "bg-[#14BDEE]" }) => (
    <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
      <div
        className={`h-full ${color} transition-all duration-500`}
        style={{ width: `${value}%` }}
      />
    </div>
  );

  const StatusBadge = ({ status }) => {
    const config = {
      not_started: { label: 'Not Started', color: 'bg-gray-100 text-gray-700' },
      draft: { label: 'Draft', color: 'bg-blue-50 text-blue-600' },
      submitted: { label: 'Submitted', color: 'bg-yellow-50 text-yellow-600' },
      under_review: { label: 'Under Review', color: 'bg-purple-50 text-purple-600' },
      graded: { label: 'Graded', color: 'bg-green-50 text-green-600' },
      late: { label: 'Late', color: 'bg-red-50 text-red-600' }
    };
    
    const { label, color } = config[status] || config.not_started;
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${color}`}>
        {label}
      </span>
    );
  };

  const AssignmentCard = ({ assignment }) => {
    const dueDate = new Date(assignment.dueDate);
    const now = new Date();
    const daysLeft = Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24));
    const isOverdue = daysLeft < 0;
    
    const getPriorityColor = () => {
      if (isOverdue) return 'text-red-500';
      if (daysLeft <= 1) return 'text-red-500';
      if (daysLeft <= 3) return 'text-yellow-500';
      return 'text-green-500';
    };

    const getTimeText = () => {
      if (isOverdue) return `Overdue by ${Math.abs(daysLeft)} days`;
      if (daysLeft === 0) return 'Due today';
      if (daysLeft === 1) return 'Due tomorrow';
      return `Due in ${daysLeft} days`;
    };

    return (
      <div 
        onClick={() => setSelectedAssignment(assignment)}
        className="group relative bg-white rounded-2xl border border-gray-200 hover:border-[#14BDEE]/50 transition-all duration-300 cursor-pointer overflow-hidden shadow-sm hover:shadow-lg"
      >
        {/* Status Indicator */}
        <div className="absolute top-4 right-4">
          <StatusBadge status={assignment.status || 'not_started'} />
        </div>
        
        <div className="p-6">
          {/* Course Info */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#14BDEE] to-[#5BD1D7] rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-xs font-medium text-[#76777A]">{assignment.courseCode}</div>
              <div className="text-sm text-[#384158]">{assignment.courseName}</div>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-[#384158] mb-2 line-clamp-2 group-hover:text-[#14BDEE] transition-colors">
            {assignment.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-[#76777A] mb-4 line-clamp-2">
            {assignment.description}
          </p>

          {/* Progress */}
          {assignment.score !== undefined && assignment.score !== null ? (
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#384158]">Score</span>
                <span className="font-bold text-[#14BDEE]">{assignment.score}/{assignment.maxMarks}</span>
              </div>
              <ProgressBar 
                value={(assignment.score / assignment.maxMarks) * 100} 
                color="bg-gradient-to-r from-[#14BDEE] to-[#5BD1D7]" 
              />
            </div>
          ) : (
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#384158]">Progress</span>
                <span className="font-bold text-[#14BDEE]">{assignment.progress || 0}%</span>
              </div>
              <ProgressBar value={assignment.progress || 0} />
            </div>
          )}

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#76777A]" />
              <span className={getPriorityColor()}>{getTimeText()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-[#76777A]" />
              <span className="text-[#384158]">{assignment.maxMarks || 100} points</span>
            </div>
          </div>

          {/* Action Button */}
          <button className="w-full mt-4 px-4 py-2.5 bg-gradient-to-r from-[#14BDEE] to-[#5BD1D7] text-white rounded-xl hover:from-[#0DAAD8] hover:to-[#14BDEE] transition-all duration-300 font-medium flex items-center justify-center gap-2">
            {assignment.status === 'not_started' && 'Start Assignment'}
            {assignment.status === 'draft' && 'Continue Editing'}
            {assignment.status === 'submitted' && 'View Submission'}
            {assignment.status === 'graded' && 'View Grade'}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  const AssignmentDetails = ({ assignment, onClose }) => {
    // Separate state management to prevent re-renders
    const [activeTab, setActiveTab] = useState('details');
    const [submission, setSubmission] = useState(null);
    const [activeStep, setActiveStep] = useState(1);
    const [submitting, setSubmitting] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
    
    // Form data state - kept separate to prevent tab switching
    const [formData, setFormData] = useState({
      answerVideoUrl: '',
      notes: '',
      files: []
    });
    
    const fileInputRef = useRef(null);

    useEffect(() => {
      if (assignment) {
        fetchSubmission();
      }
    }, [assignment]);

    const fetchSubmission = async () => {
      try {
        const submissionData = await assignmentService.getSubmission(assignment._id);
        setSubmission(submissionData);
        
        if (submissionData) {
          setFormData({
            answerVideoUrl: submissionData.answerVideoUrl || '',
            notes: submissionData.notes || '',
            files: submissionData.additionalFiles || []
          });
        }
      } catch (error) {
        console.error('Error fetching submission:', error);
      }
    };

    // Handle input changes without affecting activeTab
    const updateFormField = (field, value) => {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    };

    const handleFileUpload = async (files) => {
      const uploadedFiles = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const isPdf = file.type === 'application/pdf';
        
        // Simulate upload progress
        setUploadProgress(Math.min(100, (i + 1) * (100 / files.length)));
        
        const fileData = {
          id: Date.now() + i,
          name: file.name,
          size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
          type: isPdf ? 'PDF' : file.type.split('/')[1]?.toUpperCase() || 'FILE',
          url: URL.createObjectURL(file),
          raw: file
        };
        
        uploadedFiles.push(fileData);
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      
      setFormData(prev => ({
        ...prev,
        files: [...prev.files, ...uploadedFiles]
      }));
      
      setUploadProgress(0);
    };

    const handleFileChange = (e) => {
      const files = Array.from(e.target.files);
      if (files.length > 0) {
        handleFileUpload(files);
      }
    };

    const removeFile = (fileId) => {
      setFormData(prev => ({
        ...prev,
        files: prev.files.filter(file => file.id !== fileId)
      }));
    };

    const saveDraft = async () => {
      try {
        setSubmitting(true);
        setSubmitStatus(null);
        
        const submissionData = {
          answerVideoUrl: formData.answerVideoUrl,
          notes: formData.notes,
          submissionText: formData.submissionText || ''
        };

        const filesToUpload = formData.files
          .filter(file => file.raw)
          .map(file => file.raw);

        await assignmentService.updateSubmission(
          assignment._id,
          submissionData,
          filesToUpload
        );

        setSubmitStatus('draft_saved');
        setTimeout(() => setSubmitStatus(null), 3000);
        await fetchSubmission();
      } catch (error) {
        console.error('Error saving draft:', error);
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus(null), 3000);
      } finally {
        setSubmitting(false);
      }
    };

    const handleSubmit = async () => {
      if (!formData.answerVideoUrl.trim()) {
        setSubmitStatus('error');
        alert('Please provide a video URL before submitting');
        return;
      }

      try {
        setSubmitting(true);
        setSubmitStatus('submitting');
        
        const submissionPayload = {
          answerVideoUrl: formData.answerVideoUrl.trim(),
          notes: formData.notes.trim(),
          submissionText: formData.submissionText || ''
        };

        const filesToUpload = formData.files
          .filter(file => file.raw)
          .map(file => file.raw);

        await assignmentService.submitAssignment(
          assignment._id,
          submissionPayload,
          filesToUpload
        );

        setSubmitStatus('success');
        
        // Wait 2 seconds to show success message
        setTimeout(async () => {
          await fetchAssignmentsData();
          onClose();
        }, 2000);
        
      } catch (error) {
        console.error('Error submitting assignment:', error);
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus(null), 3000);
      } finally {
        setSubmitting(false);
      }
    };

    const steps = [
      { number: 1, title: 'Video Submission', icon: Video },
      { number: 2, title: 'Supporting Files', icon: FileUp },
      { number: 3, title: 'Review & Submit', icon: CheckCircle }
    ];

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#14BDEE] to-[#5BD1D7] rounded-xl flex items-center justify-center">
                <Clipboard className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#384158]">{assignment.title}</h2>
                <p className="text-sm text-[#76777A]">{assignment.courseName} • {assignment.courseCode}</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-[#76777A]" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            {['details', 'submit', 'grades'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-medium capitalize transition-colors ${
                  activeTab === tab
                    ? 'text-[#14BDEE] border-b-2 border-[#14BDEE]'
                    : 'text-[#76777A] hover:text-[#384158]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Submission Status Banner */}
          {submitStatus && (
            <div className={`px-6 py-3 flex items-center gap-3 ${
              submitStatus === 'success' ? 'bg-green-50 text-green-700' :
              submitStatus === 'draft_saved' ? 'bg-blue-50 text-blue-700' :
              submitStatus === 'submitting' ? 'bg-yellow-50 text-yellow-700' :
              'bg-red-50 text-red-700'
            }`}>
              {submitStatus === 'success' && <CheckCircle className="w-5 h-5" />}
              {submitStatus === 'draft_saved' && <CheckCircle className="w-5 h-5" />}
              {submitStatus === 'submitting' && <Loader2 className="w-5 h-5 animate-spin" />}
              {submitStatus === 'error' && <AlertCircle className="w-5 h-5" />}
              <span className="font-medium">
                {submitStatus === 'success' && 'Assignment submitted successfully!'}
                {submitStatus === 'draft_saved' && 'Draft saved successfully!'}
                {submitStatus === 'submitting' && 'Submitting assignment...'}
                {submitStatus === 'error' && 'Failed to submit. Please try again.'}
              </span>
            </div>
          )}

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'details' && (
              <div className="space-y-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-[#ECFEFF] to-[#EFF6FF] p-4 rounded-xl">
                    <div className="text-xs text-[#76777A] mb-1">Due Date</div>
                    <div className="font-bold text-[#384158]">
                      {new Date(assignment.dueDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-[#ECFEFF] to-[#EFF6FF] p-4 rounded-xl">
                    <div className="text-xs text-[#76777A] mb-1">Points</div>
                    <div className="font-bold text-[#384158]">{assignment.maxMarks}</div>
                  </div>
                  <div className="bg-gradient-to-br from-[#ECFEFF] to-[#EFF6FF] p-4 rounded-xl">
                    <div className="text-xs text-[#76777A] mb-1">Type</div>
                    <div className="font-bold text-[#384158] capitalize">{assignment.type}</div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-[#384158] mb-3">Description</h3>
                  <p className="text-[#76777A] leading-relaxed">{assignment.description}</p>
                </div>

                {/* Instructions */}
                {assignment.instructions && (
                  <div>
                    <h3 className="text-lg font-semibold text-[#384158] mb-3">Instructions</h3>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-[#76777A] whitespace-pre-line">{assignment.instructions}</p>
                    </div>
                  </div>
                )}

                {/* Rubric */}
                {assignment.rubric && Object.keys(assignment.rubric).length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-[#384158] mb-3">Grading Rubric</h3>
                    <div className="space-y-2">
                      {Object.entries(assignment.rubric).map(([criteria, points]) => (
                        <div key={criteria} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-[#384158]">{criteria}</span>
                          <span className="font-bold text-[#14BDEE]">{points} pts</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'submit' && (
              <div className="max-w-2xl mx-auto">
                {/* Progress Steps */}
                <div className="flex items-center justify-between mb-8">
                  {steps.map((step, index) => (
                    <React.Fragment key={step.number}>
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${
                          step.number === activeStep
                            ? 'bg-gradient-to-r from-[#14BDEE] to-[#5BD1D7] text-white'
                            : step.number < activeStep
                            ? 'bg-green-100 text-green-600'
                            : 'bg-gray-100 text-gray-400'
                        }`}>
                          {step.number < activeStep ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            <step.icon className="w-5 h-5" />
                          )}
                        </div>
                        <span className={`text-xs font-medium ${
                          step.number <= activeStep ? 'text-[#384158]' : 'text-gray-400'
                        }`}>
                          {step.title}
                        </span>
                      </div>
                      {index < steps.length - 1 && (
                        <div className="flex-1 h-1 mx-4 bg-gray-200 rounded-full">
                          <div 
                            className="h-full bg-gradient-to-r from-[#14BDEE] to-[#5BD1D7] rounded-full transition-all duration-500"
                            style={{ width: step.number < activeStep ? '100%' : '0%' }}
                          />
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Step 1: Video Submission */}
                {activeStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-[#384158] mb-2">Add Video Submission</h3>
                      <p className="text-[#76777A]">Provide a video link explaining your solution</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[#384158] mb-2">
                          Video URL *
                        </label>
                        <div className="relative">
                          <Video className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="url"
                            value={formData.answerVideoUrl}
                            onChange={(e) => updateFormField('answerVideoUrl', e.target.value)}
                            placeholder="https://youtube.com/watch?v=..."
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#14BDEE] focus:border-transparent"
                          />
                        </div>
                        <p className="text-xs text-[#76777A] mt-2">
                          Supported: YouTube, Vimeo, Google Drive
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#384158] mb-2">
                          Additional Notes (Optional)
                        </label>
                        <textarea
                          value={formData.notes}
                          onChange={(e) => updateFormField('notes', e.target.value)}
                          className="w-full h-32 px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#14BDEE] focus:border-transparent resize-none"
                          placeholder="Add any comments or context for your instructor..."
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: File Upload */}
                {activeStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-[#384158] mb-2">Upload Supporting Files</h3>
                      <p className="text-[#76777A]">Add PDFs, documents, or other supporting materials</p>
                    </div>

                    {/* Upload Area */}
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center transition-all hover:border-[#14BDEE] hover:bg-blue-50/30 cursor-pointer"
                    >
                      <div className="max-w-md mx-auto">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#ECFEFF] to-[#EFF6FF] rounded-full flex items-center justify-center mx-auto mb-4">
                          <Cloud className="w-8 h-8 text-[#14BDEE]" />
                        </div>
                        <h4 className="font-semibold text-[#384158] mb-2">Upload Files</h4>
                        <p className="text-sm text-[#76777A] mb-4">Drag & drop or click to browse</p>
                        <input
                          ref={fileInputRef}
                          type="file"
                          multiple
                          onChange={handleFileChange}
                          className="hidden"
                          accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.zip"
                        />
                        <button 
                          type="button"
                          className="px-6 py-2 bg-gradient-to-r from-[#14BDEE] to-[#5BD1D7] text-white rounded-lg hover:from-[#0DAAD8] hover:to-[#14BDEE] transition-all duration-300"
                        >
                          Browse Files
                        </button>
                        <p className="text-xs text-[#76777A] mt-4">
                          Supports PDF, DOC, images up to 100MB
                        </p>
                      </div>
                    </div>

                    {/* Upload Progress */}
                    {uploadProgress > 0 && (
                      <div className="bg-white rounded-xl p-4 border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-[#384158]">Uploading...</span>
                          <span className="font-bold text-[#14BDEE]">{uploadProgress}%</span>
                        </div>
                        <ProgressBar value={uploadProgress} />
                      </div>
                    )}

                    {/* Uploaded Files */}
                    {formData.files.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-semibold text-[#384158]">
                          Uploaded Files ({formData.files.length})
                        </h4>
                        <div className="space-y-2">
                          {formData.files.map((file) => (
                            <div
                              key={file.id}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                            >
                              <div className="flex items-center gap-3">
                                <FileText className="w-5 h-5 text-[#14BDEE]" />
                                <div>
                                  <div className="font-medium text-[#384158]">{file.name}</div>
                                  <div className="text-xs text-[#76777A]">{file.size} • {file.type}</div>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeFile(file.id);
                                }}
                                className="p-1 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4 text-red-500" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 3: Review */}
                {activeStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-[#384158] mb-2">Review Submission</h3>
                      <p className="text-[#76777A]">Check everything before final submission</p>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-gradient-to-br from-[#ECFEFF] to-[#EFF6FF] rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Video className="w-5 h-5 text-[#14BDEE]" />
                          <h4 className="font-semibold text-[#384158]">Video Submission</h4>
                        </div>
                        <p className="text-sm text-[#76777A] break-all">
                          {formData.answerVideoUrl || 'No video provided'}
                        </p>
                      </div>

                      <div className="bg-gradient-to-br from-[#ECFEFF] to-[#EFF6FF] rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <FileUp className="w-5 h-5 text-[#14BDEE]" />
                          <h4 className="font-semibold text-[#384158]">Supporting Files</h4>
                        </div>
                        <p className="text-sm text-[#76777A]">
                          {formData.files.length} file(s) attached
                        </p>
                      </div>

                      {formData.notes && (
                        <div className="bg-gradient-to-br from-[#ECFEFF] to-[#EFF6FF] rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <MessageCircle className="w-5 h-5 text-[#14BDEE]" />
                            <h4 className="font-semibold text-[#384158]">Notes</h4>
                          </div>
                          <p className="text-sm text-[#76777A]">{formData.notes}</p>
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-sm text-[#76777A] p-4 bg-gray-50 rounded-xl">
                        <Lock className="w-4 h-4" />
                        <span>Your submission is private and secure</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-200 mt-8">
                  <div>
                    {activeStep > 1 && (
                      <button
                        type="button"
                        onClick={() => setActiveStep(activeStep - 1)}
                        className="px-6 py-2.5 text-[#76777A] hover:text-[#384158] transition-colors"
                        disabled={submitting}
                      >
                        ← Back
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    {activeStep < 3 ? (
                      <>
                        <button
                          type="button"
                          onClick={saveDraft}
                          disabled={submitting}
                          className="px-6 py-2.5 border border-gray-300 text-[#76777A] rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                        >
                          {submitting ? 'Saving...' : 'Save Draft'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveStep(activeStep + 1)}
                          className="px-6 py-2.5 bg-gradient-to-r from-[#14BDEE] to-[#5BD1D7] text-white rounded-lg hover:from-[#0DAAD8] hover:to-[#14BDEE] transition-all"
                        >
                          Continue
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={saveDraft}
                          disabled={submitting}
                          className="px-6 py-2.5 border border-gray-300 text-[#76777A] rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                        >
                          Save as Draft
                        </button>
                        <button
                          type="button"
                          onClick={handleSubmit}
                          disabled={submitting || !formData.answerVideoUrl.trim()}
                          className="px-8 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg disabled:opacity-50 flex items-center gap-2"
                        >
                          {submitting ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            <>
                              <Zap className="w-4 h-4" />
                              Submit Assignment
                            </>
                          )}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'grades' && (
              <div className="text-center py-12">
                {submission?.score !== undefined && submission?.score !== null ? (
                  <>
                    <div className="mb-8">
                      <div className="text-5xl font-bold text-[#14BDEE] mb-2">
                        {submission.score}/{assignment.maxMarks}
                      </div>
                      <div className="text-lg text-[#5BD1D7] mb-4">Overall Score</div>
                      <ProgressBar 
                        value={(submission.score / assignment.maxMarks) * 100} 
                        color="bg-gradient-to-r from-[#14BDEE] to-[#5BD1D7]"
                      />
                    </div>

                    {submission.feedback && (
                      <div className="bg-gradient-to-br from-[#ECFEFF] to-[#EFF6FF] rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <MessageCircle className="w-6 h-6 text-[#14BDEE]" />
                          <h3 className="text-lg font-semibold text-[#384158]">Instructor Feedback</h3>
                        </div>
                        <p className="text-[#384158] text-left">{submission.feedback}</p>
                      </div>
                    )}
                  </>
                ) : (
                  <div>
                    <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-[#384158] mb-2">No Grade Yet</h3>
                    <p className="text-[#76777A]">
                      {submission?.submittedAt 
                        ? 'Your submission is under review'
                        : 'Submit your assignment to receive a grade'
                      }
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#14BDEE] mx-auto mb-4" />
          <div className="text-lg font-medium text-[#384158]">Loading Assignments</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-[#14BDEE] to-[#5BD1D7] rounded-xl flex items-center justify-center shadow-lg">
                  <Clipboard className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-[#384158]">Assignments</h1>
              </div>
              <p className="text-[#76777A]">Track and submit your course assignments</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <div className="text-2xl font-bold text-[#384158]">{stats.total}</div>
              <div className="text-sm text-[#76777A]">Total</div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <div className="text-2xl font-bold text-amber-500">{stats.pending}</div>
              <div className="text-sm text-[#76777A]">Pending</div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <div className="text-2xl font-bold text-blue-500">{stats.submitted}</div>
              <div className="text-sm text-[#76777A]">Submitted</div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <div className="text-2xl font-bold text-green-500">{stats.graded}</div>
              <div className="text-sm text-[#76777A]">Graded</div>
            </div>
            <div className="col-span-2 md:col-span-1 bg-gradient-to-r from-[#14BDEE] to-[#5BD1D7] text-white rounded-xl p-4 shadow-lg">
              <div className="text-2xl font-bold">{stats.averageScore}%</div>
              <div className="text-sm opacity-90">Avg. Score</div>
            </div>
          </div>
        </div>

        {/* Search & Controls */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search assignments or courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#14BDEE] focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setExpandedView('list')}
                  className={`p-2 rounded-md transition-colors ${expandedView === 'list' ? 'bg-white shadow' : 'hover:bg-white/50'}`}
                >
                  <List className={`w-4 h-4 ${expandedView === 'list' ? 'text-[#14BDEE]' : 'text-gray-400'}`} />
                </button>
                <button
                  onClick={() => setExpandedView('grid')}
                  className={`p-2 rounded-md transition-colors ${expandedView === 'grid' ? 'bg-white shadow' : 'hover:bg-white/50'}`}
                >
                  <Grid className={`w-4 h-4 ${expandedView === 'grid' ? 'text-[#14BDEE]' : 'text-gray-400'}`} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Assignments Grid */}
        {filteredAssignments.length > 0 ? (
          <div className={expandedView === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'space-y-4'
          }>
            {filteredAssignments.map(assignment => (
              <AssignmentCard key={assignment._id} assignment={assignment} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
            <Clipboard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-[#384158] mb-2">No assignments found</h3>
            <p className="text-[#76777A] mb-6">Try adjusting your search or filter</p>
            <button
              onClick={() => setSearchQuery('')}
              className="px-6 py-2.5 bg-gradient-to-r from-[#14BDEE] to-[#5BD1D7] text-white rounded-lg hover:from-[#0DAAD8] hover:to-[#14BDEE] transition-all"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Assignment Details Modal */}
        {selectedAssignment && (
          <AssignmentDetails 
            assignment={selectedAssignment}
            onClose={() => setSelectedAssignment(null)}
          />
        )}
      </div>
    </div>
  );
};

export default AssignmentsPage;