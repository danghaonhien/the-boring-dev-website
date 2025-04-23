import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ideaGeneratorImage from '../assets/images/idea/ideaGenerator.png'; // Assuming the path is correct

interface Idea {
  title: string;
  description: string;
  problem: string;
  tags: string[];
}

const ideas: Idea[] = [
  {
    title: '📝 Copy & Clean',
    description: 'Instantly copy text input while trimming extra spaces and line breaks.',
    problem: 'People paste messy text into forms.',
    tags: ['#frontend', '#forms', '#UX'],
  },
  {
    title: '⏱ Last Opened Tracker',
    description: 'Adds a "last opened" timestamp to any item/card.',
    problem: 'Users forget what they last worked on.',
    tags: ['#UI', '#dashboards', '#lowdev'],
  },
  {
    title: '💬 Auto-Label From Comment',
    description: 'Automatically adds a label/tag to an issue if a comment contains a keyword.',
    problem: 'Saves PMs from manual sorting.',
    tags: ['#productivity', '#tools', '#backend'],
  },
  {
    title: '📄 Scroll to Context',
    description: 'On error or notification, scrolls the user to the related section/component.',
    problem: 'People miss why things are broken.',
    tags: ['#frontend', '#forms', '#UX'],
  },
  {
    title: '🖼 Smart Image Placeholder',
    description: 'Shows color palette or blurred version of an image before full load.',
    problem: 'Reduces layout shifts and improves perceived speed.',
    tags: ['#performance', '#frontend'],
  },
  {
    title: '🧹 One-Click Data Clear',
    description: '"Clear All" button for filters, forms, or dashboards.',
    problem: 'People hate resetting manually.',
    tags: ['#UX', '#forms', '#dashboards'],
  },
  {
    title: '🔁 Undo Friendly',
    description: 'A simple, universal "Undo" toast for actions (archive, delete, move).',
    problem: 'Reduces fear of making mistakes.',
    tags: ['#frontend', '#feedback', '#components'],
  },
  {
    title: '📆 Keyboard Calendar Shortcuts',
    description: 'Let users use keyboard arrows to change dates in inputs.',
    problem: 'Datepickers are slow and clunky for power users.',
    tags: ['#forms', '#productivity', '#accessibility'],
  },
  {
    title: '👀 Focused Field Highlight',
    description: 'When a form is long, highlight the current field clearly.',
    problem: 'Prevents users from getting visually lost.',
    tags: ['#UX', '#forms'],
  },
  {
    title: '🔍 Auto-Expand Search on Focus',
    description: 'Search bar expands wider when focused.',
    problem: 'Helps users read and type long queries.',
    tags: ['#frontend', '#navigation'],
  },
  {
    "title": "📌 Pin to Dashboard",
    "description": "Allow users to pin their favorite modules or widgets.",
    "problem": "Helps users access frequently used tools faster.",
    "tags": ["#UX", "#dashboard", "#frontend"]
  },
  {
    "title": "🕓 Recently Viewed",
    "description": "Show a list of recently opened items or pages.",
    "problem": "Saves time navigating back to previous content.",
    "tags": ["#frontend", "#productivity"]
  },
  {
    "title": "🧹 One-Click Form Reset",
    "description": "Adds a reset button to clear all form inputs instantly.",
    "problem": "Reduces frustration when starting over.",
    "tags": ["#forms", "#UX"]
  },
  {
    "title": "🔁 Smart Autofill",
    "description": "Autofills fields based on recent entries or preferences.",
    "problem": "Speeds up repetitive data entry.",
    "tags": ["#forms", "#frontend"]
  },
  {
    "title": "📎 Drag & Drop File Upload",
    "description": "Enables drag-and-drop support for file uploads.",
    "problem": "Improves usability in upload-heavy workflows.",
    "tags": ["#frontend", "#UX", "#media"]
  },
  {
    "title": "🎯 Jump to Section",
    "description": "Adds anchor links to let users jump to specific content.",
    "problem": "Improves navigation in long pages.",
    "tags": ["#UX", "#navigation", "#accessibility"]
  },
  {
    "title": "🧭 Breadcrumb Trail",
    "description": "Display current navigation path at the top of the page.",
    "problem": "Helps users understand where they are in the app.",
    "tags": ["#navigation", "#frontend"]
  },
  {
    "title": "⏳ Save Draft Automatically",
    "description": "Auto-saves form data every few seconds.",
    "problem": "Prevents data loss from refreshes or crashes.",
    "tags": ["#forms", "#backend", "#UX"]
  },
  {
    "title": "💡 Hint on Hover",
    "description": "Show a helpful tip when hovering over complex fields.",
    "problem": "Improves clarity without adding clutter.",
    "tags": ["#frontend", "#tooltips", "#accessibility"]
  },
  {
    "title": "📆 Smart Date Suggestions",
    "description": "Auto-suggests common date options like today, tomorrow.",
    "problem": "Speeds up scheduling or filtering workflows.",
    "tags": ["#UX", "#forms", "#productivity"]
  },
  {
    "title": "🌐 Language Switcher",
    "description": "Quick toggle to switch interface language.",
    "problem": "Improves accessibility for global users.",
    "tags": ["#i18n", "#accessibility", "#frontend"]
  },
  {
    "title": "🔒 Password Peek",
    "description": "Toggle visibility for password input fields.",
    "problem": "Reduces typos in password entry.",
    "tags": ["#UX", "#forms", "#accessibility"]
  },
  {
    "title": "📉 Usage Stats Widget",
    "description": "Small chart showing recent usage/activity trends.",
    "problem": "Helps users self-monitor without digging into reports.",
    "tags": ["#dashboard", "#visualization", "#frontend"]
  },
  {
    "title": "🎯 Onboarding Checklist",
    "description": "Checklist component to guide new users through setup.",
    "problem": "Reduces drop-off during initial experience.",
    "tags": ["#onboarding", "#UX", "#retention"]
  },
  {
    "title": "📌 Floating Action Tip",
    "description": "Context-aware tip that floats near relevant actions.",
    "problem": "Increases feature discovery in complex UIs.",
    "tags": ["#UX", "#onboarding", "#frontend"]
  },
  {
    "title": "📁 Recently Uploaded",
    "description": "Displays a quick-access list of recently uploaded files.",
    "problem": "Saves users time locating their latest uploads.",
    "tags": ["#frontend", "#files", "#UX"]
  },
  {
    "title": "🧠 Smart Defaults",
    "description": "Pre-selects common user choices in dropdowns or checkboxes.",
    "problem": "Speeds up workflows by reducing repetitive selections.",
    "tags": ["#forms", "#productivity", "#frontend"]
  },
  {
    "title": "🔎 Instant Filter",
    "description": "Filters list items in real-time as users type.",
    "problem": "Improves discoverability in large datasets.",
    "tags": ["#frontend", "#UX", "#search"]
  },
  {
    "title": "📌 Scroll Position Saver",
    "description": "Remembers user scroll position on list reload.",
    "problem": "Helps users continue where they left off.",
    "tags": ["#frontend", "#navigation", "#UX"]
  },
  {
    "title": "👀 Auto Focus First Field",
    "description": "Automatically places cursor in the first input on form load.",
    "problem": "Improves form efficiency and usability.",
    "tags": ["#forms", "#UX", "#accessibility"]
  },
  {
    "title": "📋 Clipboard Preview",
    "description": "Shows a preview of pasted content before it’s submitted.",
    "problem": "Prevents unexpected formatting or data input.",
    "tags": ["#UX", "#frontend", "#forms"]
  },
  {
    "title": "🎨 Color Blind Safe Palette",
    "description": "Offers a color palette designed for accessibility.",
    "problem": "Improves UI for color-blind users.",
    "tags": ["#accessibility", "#design", "#frontend"]
  },
  {
    "title": "🕵️‍♂️ Read Mode",
    "description": "Strips distractions for a clean reading experience.",
    "problem": "Improves content focus for long reads.",
    "tags": ["#frontend", "#UX", "#productivity"]
  },
  {
    "title": "⏺ Confirm Before Leaving",
    "description": "Warns users before navigating away from unsaved changes.",
    "problem": "Prevents accidental data loss.",
    "tags": ["#UX", "#forms", "#frontend"]
  },
  {
    "title": "🧩 Component Library Preview",
    "description": "Live previews for UI components in documentation.",
    "problem": "Helps devs see how components look without running a build.",
    "tags": ["#documentation", "#devtools", "#designsystem"]
  },
  {
    "title": "📆 Auto-Date Fill",
    "description": "Auto-fills today’s date in date pickers.",
    "problem": "Speeds up form completion for common workflows.",
    "tags": ["#UX", "#forms", "#frontend"]
  },
  {
    "title": "🪄 Empty State Templates",
    "description": "Predefined messaging and illustration for empty states.",
    "problem": "Improves UX where there’s no data yet.",
    "tags": ["#UX", "#components", "#frontend"]
  },
  {
    "title": "🔔 Notification Center",
    "description": "Central place for alerts, errors, and system messages.",
    "problem": "Prevents users from missing important info.",
    "tags": ["#notifications", "#dashboard", "#frontend"]
  },
  {
    "title": "📌 Keep Sidebar Open",
    "description": "Remember sidebar open/collapse state across sessions.",
    "problem": "Improves user control over workspace layout.",
    "tags": ["#frontend", "#dashboard", "#UX"]
  },
  {
    "title": "🗂 Sticky Table Header",
    "description": "Table headers remain visible while scrolling.",
    "problem": "Makes large data tables easier to read.",
    "tags": ["#frontend", "#data", "#UX"]
  },
  {
    "title": "📱 Responsive Preview Toggle",
    "description": "Switch views between mobile, tablet, desktop on-the-fly.",
    "problem": "Helpful for checking responsive layouts in real-time.",
    "tags": ["#frontend", "#tools", "#devtools"]
  },
  {
    "title": "🔗 Copy Link with Tooltip",
    "description": "Adds a ‘Copy link’ button with confirmation tooltip.",
    "problem": "Improves shareability and feedback when copying URLs.",
    "tags": ["#frontend", "#UX", "#sharing"]
  },
  {
    "title": "📝 Inline Editing",
    "description": "Edit content directly within tables or blocks.",
    "problem": "Reduces extra clicks and improves content flow.",
    "tags": ["#UX", "#frontend", "#data"]
  },
  {
    "title": "📶 Offline Mode Banner",
    "description": "Notify users when they lose internet connection.",
    "problem": "Keeps users informed of network issues.",
    "tags": ["#UX", "#connectivity", "#frontend"]
  },
  {
    "title": "📄 File Type Preview Icons",
    "description": "Show icons based on uploaded file type (PDF, DOC, etc).",
    "problem": "Visually communicates file types before interaction.",
    "tags": ["#UX", "#frontend", "#files"]
  },
  {
    "title": "📌 Drag to Reorder",
    "description": "Reorder list items with drag-and-drop.",
    "problem": "Gives users control over content organization.",
    "tags": ["#frontend", "#UX", "#productivity"]
  },
  {
    "title": "🔤 Auto Capitalization",
    "description": "Automatically capitalizes the first letter in input fields.",
    "problem": "Improves text consistency in form entries.",
    "tags": ["#UX", "#forms"]
  },
  {
    "title": "🖱 Right-Click Quick Menu",
    "description": "Show quick actions with a right-click menu.",
    "problem": "Improves efficiency for power users.",
    "tags": ["#UX", "#frontend", "#navigation"]
  },
  {
    "title": "📤 Smart Export",
    "description": "Export data with one click based on current view/filter.",
    "problem": "Simplifies reporting and download processes.",
    "tags": ["#data", "#dashboard", "#frontend"]
  },
  {
    "title": "🗑 Confirm Delete",
    "description": "Adds an extra confirmation step before deleting.",
    "problem": "Prevents accidental data loss.",
    "tags": ["#UX", "#safety", "#frontend"]
  },
  {
    "title": "💬 AI Response Draft",
    "description": "Suggests a response based on incoming message.",
    "problem": "Speeds up communication for support/feedback.",
    "tags": ["#AI", "#UX", "#productivity"]
  },
  {
    "title": "📍 Auto Save Cursor Position",
    "description": "Saves and restores text input cursor position.",
    "problem": "Improves UX during typing interruptions.",
    "tags": ["#frontend", "#UX"]
  },
  {
    "title": "🎉 Empty State with CTA",
    "description": "Include a helpful action in empty states.",
    "problem": "Gives users direction when there's nothing to see.",
    "tags": ["#UX", "#components"]
  },
  {
    "title": "📊 Mini Analytics Card",
    "description": "Compact, glanceable performance card for dashboards.",
    "problem": "Provides key insights without overwhelming the user.",
    "tags": ["#dashboard", "#frontend"]
  },
  {
    "title": "💾 Download with Progress",
    "description": "Shows real-time download progress for large files.",
    "problem": "Gives users feedback and expectations.",
    "tags": ["#UX", "#media"]
  },
  {
    "title": "📁 File Size Limit Warning",
    "description": "Warn users when upload exceeds limit before submission.",
    "problem": "Prevents wasted time and failed uploads.",
    "tags": ["#forms", "#files", "#UX"]
  },
  {
    "title": "📅 Show Day of the Week",
    "description": "Displays the weekday next to selected date.",
    "problem": "Improves calendar clarity for scheduling.",
    "tags": ["#UX", "#frontend"]
  },
  {
    "title": "🧠 Keyboard Shortcuts Hint",
    "description": "Show shortcut hints on hover/tooltips.",
    "problem": "Teaches power features without needing docs.",
    "tags": ["#UX", "#accessibility", "#productivity"]
  },
  {
    "title": "📥 Scroll to New",
    "description": "Automatically scrolls to the newest content/message.",
    "problem": "Ensures users see what's new without effort.",
    "tags": ["#chat", "#feed", "#frontend"]
  },
  {
    "title": "📦 Bulk Action Selector",
    "description": "Perform an action on multiple items at once.",
    "problem": "Saves time in list/table management.",
    "tags": ["#frontend", "#data", "#UX"]
  },
  {
    "title": "🔐 Hide Sensitive Info by Default",
    "description": "Blur email, phone, or credit card until revealed.",
    "problem": "Protects privacy in shared screens or screenshots.",
    "tags": ["#security", "#frontend", "#UX"]
  },
  {
    "title": "🧾 Invoice PDF Download",
    "description": "One-click export of invoices in PDF format.",
    "problem": "Simplifies access to payment records.",
    "tags": ["#finance", "#UX"]
  },
  {
    "title": "📂 Folder Tags",
    "description": "Add color-coded tags or labels to folders.",
    "problem": "Helps users visually organize content.",
    "tags": ["#files", "#frontend", "#UX"]
  },
  {
    "title": "🧩 Code Snippet Preview",
    "description": "Render formatted code blocks in preview panes.",
    "problem": "Improves readability in dev-focused UIs.",
    "tags": ["#devtools", "#frontend"]
  },
  {
    "title": "📈 Sparkline Trends",
    "description": "Small trend graphs embedded in table rows.",
    "problem": "Lets users see data direction at a glance.",
    "tags": ["#data", "#dashboard", "#visualization"]
  },
  {
    "title": "🔊 Audio Feedback Toggle",
    "description": "Optional UI sounds for interaction (clicks, alerts).",
    "problem": "Adds tactile-like feedback, especially for accessibility.",
    "tags": ["#accessibility", "#UX"]
  },
  {
    "title": "📍 Recently Used Filters",
    "description": "Save last-used filters in a session.",
    "problem": "Saves time when users revisit data views.",
    "tags": ["#dashboard", "#frontend", "#UX"]
  },
  {
    "title": "📋 Copy Table Row",
    "description": "Easily copy data from a row with one click.",
    "problem": "Streamlines data sharing and debugging.",
    "tags": ["#data", "#UX"]
  },
  {
    "title": "📦 Reusable Component Preview",
    "description": "Preview what UI components will look like before inserting.",
    "problem": "Reduces layout guesswork during page builds.",
    "tags": ["#designsystem", "#frontend"]
  },
  {
    "title": "📶 Network Status Badge",
    "description": "Real-time indicator of network connectivity.",
    "problem": "Keeps users informed about connection drops.",
    "tags": ["#UX", "#connectivity"]
  },
  {
    "title": "🔢 Numeric Only Input",
    "description": "Enforces numeric entry with soft validation.",
    "problem": "Improves accuracy and prevents typos.",
    "tags": ["#forms", "#frontend"]
  },
  {
    "title": "📋 Copy Button With Icon",
    "description": "Copy text to clipboard with feedback and icon toggle.",
    "problem": "Improves clarity when copying content.",
    "tags": ["#frontend", "#UX"]
  },
  {
    "title": "🕹 Feedback Slider",
    "description": "Let users rate experiences with a slider instead of numbers.",
    "problem": "Creates more nuanced and engaging feedback.",
    "tags": ["#UX", "#feedback", "#forms"]
  },
  {
    "title": "🔍 Highlight Search Term in Results",
    "description": "Highlights keywords in search result lists.",
    "problem": "Improves visual scanning and content match confidence.",
    "tags": ["#frontend", "#search"]
  },
  {
    "title": "🛑 Inactivity Timeout Warning",
    "description": "Shows a warning before automatic logout.",
    "problem": "Prevents data loss during long pauses.",
    "tags": ["#security", "#UX"]
  },
  {
    "title": "📜 Scroll Indicator",
    "description": "Progress bar at top of the screen based on scroll.",
    "problem": "Gives feedback on content length and reading progress.",
    "tags": ["#frontend", "#UX"]
  },
];

const IdeaGenerator: React.FC = () => {
  const [currentIdea, setCurrentIdea] = useState<Idea | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const generateIdea = () => {
    setIsVisible(false); // Hide current idea to trigger exit animation
    const randomIndex = Math.floor(Math.random() * ideas.length);
    const newIdea = ideas[randomIndex];

    // Allow time for exit animation before showing new idea
    setTimeout(() => {
      setCurrentIdea(newIdea);
      setIsVisible(true); // Show new idea
    }, 300); // Match animation duration
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-boring-hero-bg rounded-lg shadow-lg relative overflow-hidden">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-boring-dark text-center">
        Need a tiny, useful feature idea?
      </h2>
      <p className="text-boring-dark/80 mb-8 text-center max-w-xl">
        Click the screen below for a low-effort, high-impact feature you could build this weekend.
      </p>
      <div className="relative w-full max-w-2xl cursor-pointer group" onClick={generateIdea}>
        <img
          src={ideaGeneratorImage}
          alt="Idea Generator Screen - Click to generate"
          className="w-full h-auto rounded-md transition-transform duration-300 ease-in-out group-hover:scale-[1.0001]"
        />
        {/* Idea Display Area - Positioned over the screen part of the image */}
        <div className="absolute inset-0 flex items-start justify-center p-4 sm:p-8 md:p-12 lg:p-16 xl:p-auto  ">
          {/* Adjust padding based on image screen area */}
          <div className="w-[calc(100%-20%)] lg:w-[calc(100%-15%)] lg:h-[calc(100%-50%)] h-[calc(100%-50%)] bg-gray-800 bg-opacity-70 backdrop-blur-md  rounded-md lg:rounded-xl flex items-center justify-center overflow-hidden">
             {/* Approximate screen area percentage - adjust as needed */}
            <AnimatePresence mode="wait">
              {isVisible && currentIdea && (
                <motion.div
                  key={currentIdea.title} // Key ensures re-render on change
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="text-left p-4 text-boring-offwhite max-w-full"
                >
                  <h3 className="text-[11px] sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2 text-boring-offwhite/80">{currentIdea.title}</h3>
                  <p className="text-[11px] sm:text-sm md:text-base mb-1 sm:mb-2">{currentIdea.description}</p>
                  <p className="text-[11px] sm:text-sm md:text-base mb-2 sm:mb-3 italic text-boring-offwhite/80">
                    <span className="font-semibold">Solves:</span> {currentIdea.problem}
                  </p>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {currentIdea.tags.map((tag) => (
                      <span key={tag} className="text-[8px] md:text-[12px] sm:text-xs bg-boring-slate/50 text-boring-offwhite/90 px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
              {!currentIdea && (
                 <motion.div
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ delay: 0.5 }}
                   className="text-boring-offwhite/70 text-center p-4 text-sm sm:text-base md:text-lg font-medium"
                 >
                    Click Me!
                 </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaGenerator; 