import React from 'react';
import PageTransition from '../../../components/PageTransition';
import { ScrollReveal } from '../../../components/EnhancedInteractiveElements';
import { Link } from 'react-router-dom';
import { ComponentCollageHero } from '../../../components/ComponentCollageHero';
// import { Box, Typography, List, ListItem, Paper, Grid } from '@mui/material'; // Example imports if using a UI library

const CorePrinciplesSection: React.FC = () => (
    <section className="mb-12 md:mb-16">
        <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 border-b border-gray-200 dark:border-gray-700 pb-2 pt-12">🔧 Core Principles</h2>
            <ul className="space-y-3 list-disc pl-5 text-gray-700 dark:text-gray-300">
                <li><strong>Low Effort, High Consistency:</strong> Reusable tokens, basic structure, and components that don't need a PhD to use.</li>
                <li><strong>Default to "Good Enough":</strong> No overthinking. Just clean defaults that won't embarrass you.</li>
                <li><strong>Vibes &gt; Visual Noise:</strong> Whitespace is free. Use it.</li>
                <li><strong>Dark Mode, Light Effort:</strong> Because we all live in the shadows anyway.</li>
            </ul>
        </ScrollReveal>
    </section>
);

const WhatsIncludedSection: React.FC = () => (
    <section className="mb-12 md:mb-16">
        <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-semibold mb-8 border-b border-gray-200 dark:border-gray-700 pb-2">What's Included (Examples)</h2>
            <div className="space-y-12">
                <div>
                    <h3 className="text-xl md:text-2xl font-semibold mb-4">1. Typography Scale (No Drama Edition)</h3>
                    <div className="space-y-4 text-gray-700 dark:text-gray-300">
                        <p className="text-3xl font-medium">Almost Large (3xl)</p>
                        <p className="text-xl">Kinda Big (xl)</p>
                        <p className="text-base">Regular Normal (base)</p>
                        <p className="text-sm">Smol Text (sm)</p>
                        <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">Font: Using default sans-serif. (Ideally Inter or IBM Plex if loaded).</p>
                    </div>
                </div>

                <div>
                    <h3 className="text-xl md:text-2xl font-semibold mb-4">2. Color Tokens</h3>
                    <div className="flex flex-wrap gap-4 items-center">
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-lg bg-boring-offwhite border border-gray-200 dark:border-gray-700 shadow-inner"></div>
                            <code className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">Off-White</code>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-lg bg-gray-300 dark:bg-gray-600 shadow-inner"></div>
                            <code className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">Mid-Gray (Placeholder)</code>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-lg bg-boring-gray shadow-inner"></div>
                            <code className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">boring.gray</code>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-lg bg-boring-slate shadow-inner"></div>
                            <code className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">boring.slate</code>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-lg bg-boring-dark shadow-inner"></div>
                            <code className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">boring.dark</code>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-lg bg-blue-500 shadow-inner"></div>
                            <code className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">#maybe-blue</code>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-lg bg-red-500 shadow-inner"></div>
                            <code className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">"red-ish"</code>
                        </div>
                    </div>
                    <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">Note: Actual `boring-gray-100` to `900` scale not defined, using available colors as stand-ins.</p>
                </div>

                <div>
                    <h3 className="text-xl md:text-2xl font-semibold mb-4">3. Buttons</h3>
                    <div className="flex flex-wrap gap-4 items-center">
                        <button className="px-4 py-2 bg-boring-dark text-boring-offwhite rounded-md hover:bg-boring-slate transition-colors font-medium">
                            Primary
                        </button>
                        <button className="px-4 py-2 border border-boring-dark text-boring-dark dark:text-boring-offwhite dark:border-boring-offwhite rounded-md hover:bg-boring-dark/10 dark:hover:bg-boring-offwhite/10 transition-colors font-medium">
                            Secondary
                        </button>
                        <button className="px-4 py-2 text-boring-dark dark:text-boring-offwhite rounded-md hover:bg-boring-dark/10 dark:hover:bg-boring-offwhite/10 transition-colors font-medium">
                            Whatever (Ghost?)
                        </button>
                    </div>
                    <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">Default border radius: <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">rounded-md</code> (Tailwind's ~6px default). States: normal, hover.</p>
                </div>

                <div>
                    <h3 className="text-xl md:text-2xl font-semibold mb-4">4. Spacing System</h3>
                    <div className="flex flex-wrap gap-4 items-end">
                        <div className="text-center">
                            <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700"></div>
                            <code className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">xs (p-1?)</code>
                        </div>
                        <div className="text-center">
                            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700"></div>
                            <code className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">sm (p-2?)</code>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700"></div>
                            <code className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">md (p-4?)</code>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700"></div>
                            <code className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">lg (p-6?)</code>
                        </div>
                        <div className="text-center">
                            <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700"></div>
                            <code className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">xl (p-8?)</code>
                        </div>
                        <div className="text-center">
                            <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700"></div>
                            <code className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">xxl (p-12?)</code>
                        </div>
                    </div>
                    <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">Based on Tailwind's default spacing scale (multiples of 4). </p>
                </div>

                <div>
                    <h3 className="text-xl md:text-2xl font-semibold mb-4">5. Cards & Layout Grids</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-boring-offwhite dark:bg-boring-dark border border-gray-200 dark:border-gray-700 rounded-md p-6 shadow-md">
                            <h4 className="font-semibold mb-2">Card (Shadow: on)</h4>
                            <p className="text-sm text-boring-gray dark:text-boring-slate">This is a card. It has some content. It exists.</p>
                        </div>
                        <div className="bg-boring-offwhite dark:bg-boring-dark border border-gray-200 dark:border-gray-700 rounded-md p-6">
                            <h4 className="font-semibold mb-2">Card (Shadow: off)</h4>
                            <p className="text-sm text-boring-gray dark:text-boring-slate">This one is trying to blend in.</p>
                        </div>
                    </div>
                    <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">Default grid: 12 columns (not shown). Shadow: Existential (pending implementation).</p>
                </div>

                <div>
                    <h3 className="text-xl md:text-2xl font-semibold mb-4">6. Components</h3>
                    <div className="space-y-6">
                        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                            <label htmlFor="boring-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Input</label>
                            <input
                                type="text"
                                id="boring-input"
                                placeholder="meh"
                                className="block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-500"
                            />
                        </div>

                        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md border border-gray-200 dark:border-gray-700">
                            <h4 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Modal (Placeholder)</h4>
                            <div className="bg-white dark:bg-gray-900 p-6 rounded shadow-lg max-w-sm mx-auto text-center">
                                <p className="text-sm text-gray-600 dark:text-gray-400">This would be a modal.</p>
                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">(Escape-friendly)</p>
                                <button className="mt-4 px-3 py-1 bg-boring-dark/10 dark:bg-boring-offwhite/10 text-xs rounded">Close</button>
                            </div>
                        </div>

                        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md border border-gray-200 dark:border-gray-700">
                            <h4 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Toast / Alert (Placeholder)</h4>
                            <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-200 px-4 py-3 rounded relative" role="alert">
                                <strong className="font-bold">Panic Alert! </strong>
                                <span className="block sm:inline">Something kinda important happened.</span>
                            </div>
                        </div>

                        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md border border-gray-200 dark:border-gray-700">
                            <h4 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Tabs (Placeholder)</h4>
                            <div>
                                <div className="border-b border-gray-200 dark:border-gray-700">
                                    <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                                        <button className="whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm text-blue-600 dark:text-blue-400 border-blue-500 dark:border-blue-400">
                                            Hierarchy
                                        </button>
                                        <button className="whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-500 border-transparent">
                                            Was
                                         </button>
                                         <button className="whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-500 border-transparent">
                                            Hard
                                         </button>
                                    </nav>
                                </div>
                                <div className="pt-4 text-sm text-gray-600 dark:text-gray-400">
                                    Content for the selected tab would appear here.
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md border border-gray-200 dark:border-gray-700">
                            <h4 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Badges / Tags (Placeholder)</h4>
                            <div className="flex flex-wrap gap-2">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200">
                                    Maybe Blue
                                </span>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                                    Boring Gray
                                </span>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200">
                                    Red-ish
                                </span>
                            </div>
                        </div>

                        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md border border-gray-200 dark:border-gray-700">
                            <h4 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Tooltip (Placeholder)</h4>
                            <div className="relative inline-block group">
                                <button className="px-3 py-1 border border-dashed border-gray-400 dark:border-gray-600 text-sm rounded text-gray-600 dark:text-gray-400">
                                     Hover Me
                                </button>
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block px-2 py-1 bg-boring-dark text-boring-offwhite text-xs rounded shadow-lg whitespace-nowrap z-10">
                                    Tooltip text!
                                    <svg className="absolute text-boring-dark h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255" xmlSpace="preserve"><polygon className="fill-current" points="0,0 127.5,127.5 255,0"/></svg>
                                </div>
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400 ml-4 italic">(Actual tooltip needs hover logic/JS)</span>
                        </div>

                        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md border border-gray-200 dark:border-gray-700">
                            <h4 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Checkbox / Radio (Placeholder)</h4>
                            <div className="flex space-x-6">
                                <div className="flex items-center">
                                    <input id="checkbox-example" type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 dark:bg-gray-700 dark:focus:ring-blue-600" />
                                    <label htmlFor="checkbox-example" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">Checkbox</label>
                                </div>
                                <div className="flex items-center">
                                    <input id="radio-example" name="radio-group" type="radio" className="h-4 w-4 text-blue-600 border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:bg-gray-700 dark:focus:ring-blue-600" />
                                    <label htmlFor="radio-example" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">Radio</label>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md border border-gray-200 dark:border-gray-700">
                            <h4 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Progress Bar (Placeholder)</h4>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center">45% Maybe</p>
                        </div>

                        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md border border-gray-200 dark:border-gray-700">
                            <h4 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Avatar (Placeholder)</h4>
                            <div className="flex space-x-4 items-center">
                                <span className="inline-block h-10 w-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-600">
                                    <svg className="h-full w-full text-gray-400 dark:text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </span>
                                <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-boring-slate text-white font-medium">
                                    BD
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </ScrollReveal>
    </section>
);

const NamingConventionSection: React.FC = () => (
    <section className="mb-12 md:mb-16">
        <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">Naming Convention</h2>
            <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                <li><code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">btn-who-cares</code></li>
                <li><code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">text-slightly-loud</code></li>
                <li><code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">card-actually-important</code></li>
                <li><code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">bg-vibe-neutral</code></li>
                <li><code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">spacing-idk-12px</code></li>
            </ul>
        </ScrollReveal>
    </section>
);

const StretchFeaturesSection: React.FC = () => (
    <section className="mb-12 md:mb-16">
        <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">Stretch Features (Optional, Chaotic)</h2>
            <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                <li>Mood-based theming (themes auto-switch if user hasn't moved the mouse in 10 mins)</li>
                <li>A Figma plugin that just says "You're doing fine"</li>
                <li>Easter egg: pressing <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">Cmd + Z</code> shows a motivational quote in monospace</li>
            </ul>
        </ScrollReveal>
    </section>
);

const WhyBuildItSection: React.FC = () => (
    <section>
        <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">Why Build It?</h2>
            <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                <li>For portfolio spice with humor</li>
                <li>As a joke-turned-useful framework for hackathons, demos, or indie projects</li>
                <li>As a real working system for people who hate working on design systems</li>
            </ul>
        </ScrollReveal>
    </section>
);

const DesignSystem01ProjectPage: React.FC = () => {
    return (
        <PageTransition>
            <header className="p-6 md:p-12 w-full absolute top-0 left-0 z-20">
                <div className="flex justify-between items-center">
                    <Link to="/">
                      <div className="text-gray-900 dark:text-gray-100 font-bold text-2xl uppercase">
                        THE BORING DEV
                      </div>
                    </Link>
                </div>
            </header>

            <div className="bg-white dark:bg-black min-h-screen text-black dark:text-white pt-12 md:pt-12">
                <div className=" px-6 lg:px-12 py-16 md:py-24">

                    <ScrollReveal>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">The Boring Design System</h1>
                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-12 md:mb-16">
                            A system so simple, it kinda works. Just enough structure to stop chaos, not enough to start a fight.
                        </p>
                    </ScrollReveal>

                    <ComponentCollageHero />

                    <CorePrinciplesSection />
                    <WhatsIncludedSection />
                    <NamingConventionSection />
                    <StretchFeaturesSection />
                    <WhyBuildItSection />

                </div>
            </div>
        </PageTransition>
    );
};

export default DesignSystem01ProjectPage;
