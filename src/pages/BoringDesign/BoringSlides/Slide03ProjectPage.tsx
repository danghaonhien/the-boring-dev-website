import React from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '../../../components/PageTransition';
import { ScrollReveal } from '../../../components/EnhancedInteractiveElements'; // Assuming this path is correct

// --- Reusable Slide Component (Copied from Slide02) ---
interface SlideProps {
  label?: string;
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const Slide: React.FC<SlideProps> = ({ label, title, children, className = "" }) => (
  <section className={` py-12 md:py-12 flex items-center ${className}`}>
    <div className="px-12 w-full">
      <ScrollReveal>
        {label && (
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">
            {label}
          </p>
        )}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-8 md:mb-12">
          {title}
        </h2>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {children}
        </div>
      </ScrollReveal>
    </div>
  </section>
);

// --- Helper component for basic card structure (Copied from Slide02) ---
const CardPreview: React.FC<{ children: React.ReactNode; className?: string; isDark?: boolean }> =
    ({ children, className = "", isDark = false }) => (
    <div className={`h-full rounded-lg shadow-md overflow-hidden flex flex-col ${isDark ? 'bg-gray-950 text-white border border-gray-800' : 'bg-white text-black border border-gray-200'} ${className}`}>
      {children}
    </div>
);

// --- Reusable Slide Collage Component (Copied from Slide02) ---
interface SlideCollageProps {
  cards: React.ReactNode[];
  layout: number[];
}

const SlideCollage: React.FC<SlideCollageProps> = ({ cards, layout }) => {
  // Determine the number of columns based on the layout array sum or a fixed max
  // Defaulting to 3 columns for simplicity if layout isn't complex
  const gridColsClass = 'md:grid-cols-3'; // Fixed 3 columns on medium screens and up

  return (
    <div className={`grid grid-cols-1 ${gridColsClass} gap-4 md:gap-6 not-prose`}>
      {cards.map((CardComponent, index) => {
        // Using a fixed span of 1 for each card in this typography showcase
        const gridColumnClass = `md:col-span-1`;

        return (
          <div key={index} className={`${gridColumnClass} h-full`}>
            {CardComponent}
          </div>
        );
      })}
    </div>
  );
};


// --- New Font Display Card Component ---
interface FontDisplayCardProps {
  fontName: string;
  fontFamily: string; // CSS font-family value
  weights: { name: string; weight: number }[];
  sizes: { label: string; class: string }[];
  useCases: string[];
  isDark?: boolean;
}

const FontDisplayCard: React.FC<FontDisplayCardProps> = ({
  fontName,
  fontFamily,
  weights,
  sizes,
  useCases,
  isDark = false,
}) => {
    // Select Light, Regular, and Medium weights to display visually
    const displayWeights = [
        weights.find(w => w.weight === 300 || w.name.toLowerCase().includes('light')),
        weights.find(w => w.weight === 400 || w.name.toLowerCase().includes('regular')),
        weights.find(w => w.weight === 500 || w.name.toLowerCase().includes('medium')),
        // Keep Semibold as a fallback if Medium isn't available
        weights.find(w => w.weight === 600 || w.name.toLowerCase().includes('semibold'))
    ].filter(Boolean) as { name: string; weight: number }[]; // Filter out undefined and assert type

    // Keep only unique weights based on numeric value for display, prioritizing Light, Regular, Medium
    const uniqueDisplayWeights = displayWeights.reduce((acc, current) => {
        if (!acc.some(item => item.weight === current.weight)) {
            acc.push(current);
        }
        return acc;
    }, [] as { name: string; weight: number }[]);

    return (
        <CardPreview isDark={isDark} className="p-5 flex flex-col">
            <div>
                <h3 style={{ fontFamily, fontWeight: 600 }} className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-black'}`}>{fontName}</h3>
                <div style={{ fontFamily }} className={`mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {uniqueDisplayWeights.map(weight => (
                        <p key={weight.name} style={{ fontWeight: weight.weight }} className="text-lg">
                          {weight.name} (Aa Bb Cc)
                        </p>
                    ))}
                </div>
                <p style={{fontFamily}} className={`text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>1234567890</p>
            </div>

            <div className="flex-grow space-y-3">
                <div className="mb-3">
                    <h4 className={`text-xs font-semibold uppercase tracking-wider mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Sizes</h4>
                    <div className="flex flex-wrap gap-x-3 gap-y-1">
                        {sizes.map(size => (
                            <span key={size.label} style={{ fontFamily }} className={`${size.class} ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{size.label}</span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-auto pt-3">
                <h4 className={`text-xs font-semibold uppercase tracking-wider mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Use Cases</h4>
                <p className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{useCases.join(', ')}</p>
            </div>
        </CardPreview>
    );
};


// --- Main Page Component ---
const Slide03ProjectPage: React.FC = () => {

  // --- Font Data (Updated weights to include numeric values, remove largest size) ---
  const fontsData: Omit<FontDisplayCardProps, 'isDark'>[] = [
    {
      fontName: 'Inter',
      fontFamily: "'Inter', sans-serif",
      weights: [{ name: 'Regular', weight: 400 }, { name: 'Medium', weight: 500 }, { name: 'SemiBold', weight: 600 }, { name: 'Bold', weight: 700 }, { name: 'ExtraBold', weight: 800 }],
      sizes: [{ label: '14px', class: 'text-sm' }, { label: '18px', class: 'text-lg' }, { label: '30px', class: 'text-2xl' }], // Removed largest
      useCases: ['UI Elements', 'Body Text', 'Modern Headings'],
    },
    {
      fontName: 'Roboto',
      fontFamily: "'Roboto', sans-serif",
      weights: [{ name: 'Light', weight: 300 }, { name: 'Regular', weight: 400 }, { name: 'Medium', weight: 500 }, { name: 'Bold', weight: 700 }, { name: 'Black', weight: 900 }],
      sizes: [{ label: '16px', class: 'text-base' }, { label: '24px', class: 'text-xl' }, { label: '36px', class: 'text-3xl' }], // Removed largest
      useCases: ['General UI', 'Android Apps', 'Body Text', 'Large Display'],
    },
    {
      fontName: 'Open Sans',
      fontFamily: "'Open Sans', sans-serif",
      weights: [{ name: 'Light', weight: 300 }, { name: 'Regular', weight: 400 }, { name: 'SemiBold', weight: 600 }, { name: 'Bold', weight: 700 }, { name: 'ExtraBold', weight: 800 }],
      sizes: [{ label: 'Body', class: 'text-lg' }, { label: 'Subheading', class: 'text-2xl' }, { label: 'Heading', class: 'text-4xl' }], // Removed largest
      useCases: ['Web Content', 'Print', 'Readable Body', 'Clear Headings'],
    },
    {
        fontName: 'Lato',
        fontFamily: "'Lato', sans-serif",
        weights: [{ name: 'Light', weight: 300 }, { name: 'Regular', weight: 400 }, { name: 'Bold', weight: 700 }, { name: 'Black', weight: 900 }],
        sizes: [{ label: '16px', class: 'text-base' }, { label: '22px', class: 'text-xl' }, { label: '34px', class: 'text-3xl' }], // Removed largest
        useCases: ['Corporate Sites', 'Body Text', 'Balanced Headings', 'Subtitles'],
    },
    {
        fontName: 'Montserrat',
        fontFamily: "'Montserrat', sans-serif",
        weights: [{ name: 'Regular', weight: 400 }, { name: 'Medium', weight: 500 }, { name: 'Bold', weight: 700 }, { name: 'ExtraBold', weight: 800 }, { name: 'Black', weight: 900 }],
        sizes: [{ label: 'Standard', class: 'text-lg' }, { label: 'Title', class: 'text-3xl' }, { label: 'Large Title', class: 'text-5xl' }], // Removed largest
        useCases: ['Headlines', 'Display Text', 'Modern Look', 'Branding'],
    },
    {
        fontName: 'Poppins',
        fontFamily: "'Poppins', sans-serif",
        weights: [{ name: 'Light', weight: 300 }, { name: 'Regular', weight: 400 }, { name: 'Medium', weight: 500 }, { name: 'SemiBold', weight: 600 }, { name: 'Bold', weight: 700 }, { name: 'ExtraBold', weight: 800 }],
        sizes: [{ label: '18px', class: 'text-lg' }, { label: '24px', class: 'text-xl' }, { label: '36px', class: 'text-3xl' }], // Removed largest
        useCases: ['Geometric Designs', 'Headings', 'Buttons', 'Feature Text'],
    },
    {
        fontName: 'Source Sans Pro',
        fontFamily: "'Source Sans Pro', sans-serif",
        weights: [{ name: 'ExtraLight', weight: 200 }, { name: 'Light', weight: 300 }, { name: 'Regular', weight: 400 }, { name: 'SemiBold', weight: 600 }, { name: 'Bold', weight: 700 }, { name: 'Black', weight: 900 }],
        sizes: [{ label: 'Normal', class: 'text-lg' }, { label: 'Large', class: 'text-2xl' }, { label: 'X-Large', class: 'text-4xl' }], // Removed largest
        useCases: ['UI Interfaces', 'Adobe Products', 'Code Snippets', 'Info Text'],
    },
    {
        fontName: 'Oswald',
        fontFamily: "'Oswald', sans-serif",
        weights: [{ name: 'Light', weight: 300 }, { name: 'Regular', weight: 400 }, { name: 'Medium', weight: 500 }, { name: 'Bold', weight: 700 }],
        sizes: [{ label: 'Headline', class: 'text-3xl' }, { label: 'Display', class: 'text-5xl' }, { label: 'Impact', class: 'text-6xl' }], // Removed largest
        useCases: ['Headlines', 'Condensed Text', 'Impactful Titles', 'Posters'],
    },
    {
        fontName: 'Raleway',
        fontFamily: "'Raleway', sans-serif",
        weights: [{ name: 'Thin', weight: 100 }, { name: 'Light', weight: 300 }, { name: 'Regular', weight: 400 }, { name: 'Medium', weight: 500 }, { name: 'Bold', weight: 700 }, { name: 'Black', weight: 900 }], // Added Light
        sizes: [{ label: 'Elegant', class: 'text-xl' }, { label: 'Stylish', class: 'text-3xl' }, { label: 'Display', class: 'text-5xl' }], // Removed largest
        useCases: ['Stylish Headings', 'Display', 'Elegant Designs', 'Portfolios'],
    },
    {
        fontName: 'Merriweather',
        fontFamily: "'Merriweather', serif",
        weights: [{ name: 'Light', weight: 300 }, { name: 'Regular', weight: 400 }, { name: 'Bold', weight: 700 }, { name: 'Black', weight: 900 }],
        sizes: [{ label: 'Readable', class: 'text-lg' }, { label: 'Emphasis', class: 'text-xl' }, { label: 'Title', class: 'text-3xl' }], // Removed largest
        useCases: ['Long-form Reading', 'Articles', 'Classic Look', 'Book Typesetting'],
    },
    {
        fontName: 'Playfair Display',
        fontFamily: "'Playfair Display', serif",
        weights: [{ name: 'Regular', weight: 400 }, { name: 'Bold', weight: 700 }, { name: 'Black', weight: 900 }],
        sizes: [{ label: 'Heading', class: 'text-3xl' }, { label: 'Large Heading', class: 'text-5xl' }, { label: 'Banner', class: 'text-6xl' }], // Removed largest
        useCases: ['Headlines', 'Luxury Brands', 'Editorial', 'Invitations'],
    },
    {
        fontName: 'Noto Sans',
        fontFamily: "'Noto Sans', sans-serif",
        weights: [{ name: 'Regular', weight: 400 }, { name: 'Medium', weight: 500 }, { name: 'Bold', weight: 700 }, { name: 'Black', weight: 900 }],
        sizes: [{ label: 'Interface', class: 'text-lg' }, { label: 'Clear', class: 'text-xl' }, { label: 'Section Title', class: 'text-3xl' }], // Removed largest
        useCases: ['Multilingual Content', 'UI/UX', 'Google Fonts Default', 'Accessibility'],
    }
  ];

  // Create card components from data
  const fontCards = fontsData.map((font, index) => (
    <FontDisplayCard key={font.fontName} {...font} isDark={index % 2 !== 0} />
  ));

  // Define a simple layout (e.g., 3 columns)
  const layout: number[] = [1, 1, 1]; // Each card spans 1 column in a 3-column grid

  return (
    <PageTransition>
      <div className="bg-gray-50 dark:bg-black text-gray-800 dark:text-gray-200 transition-colors duration-300 relative">
        {/* Header */}
        <header className="p-6 md:p-12 w-full absolute top-0 left-0 z-20">
            <div className="flex justify-between items-center">
                <Link to="/">
                  <div className="text-gray-900 dark:text-gray-100 font-bold text-2xl uppercase">
                    THE BORING DEV
                  </div>
                </Link>
                {/* Link to other slides can be added here */}
            </div>
        </header>

        {/* --- Slide 1: Introduction --- */}
        <div className="pt-24 md:pt-32">
           <Slide
             label="Typography Showcase" // Updated Label
             title="Slide 03 - Typography vs. Impostor Syndrome" // Updated Title
             className="bg-gradient-to-b from-gray-100 dark:from-gray-900 to-transparent pt-12 mt-0"
           >
              <div className="max-w-3xl text-left">
                 <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 text-left">
                  A deep dive into font choices that say “I’m a professional” even when we feel like Comic Sans inside.
                 </p>
               </div>
           </Slide>
        </div>

        {/* --- Slide 2: Font Collage --- */}
        <Slide
          label="Templates" // Updated Label
          title="Popular Font Examples" // Updated Title - Removed shuffle button
        >
          <div className="space-y-8 md:space-y-12">
             {/* Using SlideCollage to display the font cards */}
             <SlideCollage cards={fontCards} layout={layout} />
          </div>
        </Slide>

      </div>
    </PageTransition>
  );
};

export default Slide03ProjectPage; // Updated export name