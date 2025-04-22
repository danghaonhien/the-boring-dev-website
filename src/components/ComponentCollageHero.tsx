import React from 'react';
import { ScrollReveal } from './EnhancedInteractiveElements'; // Assuming ScrollReveal is in the same dir or update path

// --- Component Collage Hero ---
export const ComponentCollageHero: React.FC = () => (
    // Note: Added overflow-hidden to the parent section to contain rounded corners properly
    <section className="h-full w-full overflow-hidden"> 
        <ScrollReveal> {/* Removed className="h-full" */}
            {/* Use Flexbox with wrapping, ensure it fills height */}
            <div className="flex flex-wrap gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700/50 items-stretch h-72 md:h-[440px] text-xxs">

                {/* Assign varying widths/flex-basis */} 

                {/* Card Example (Larger) */}
                <div className="w-full sm:w-[30%] p-2 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col">
                    <h4 className="font-medium mb-0.5">Card</h4>
                    <p className="text-gray-500 dark:text-gray-400 flex-grow text-[9px] leading-tight">Content area...</p>
                    <button className="mt-1 px-1.5 py-0.5 bg-boring-dark/10 dark:bg-boring-offwhite/10 rounded self-start text-[9px]">Action</button>
                 </div>

                {/* Button Example */}
                <div className="w-auto p-2 bg-white dark:bg-gray-800 rounded flex items-center">
                     <button className="px-2 py-0.5 bg-boring-dark text-boring-offwhite rounded hover:bg-boring-slate transition-colors">
                         Btn
                     </button>
                </div>

                 {/* Input Example */}
                 <div className="w-[25%] flex-grow p-2 bg-white dark:bg-gray-800 rounded flex flex-col justify-center">
                    <label className="text-gray-500 dark:text-gray-400 mb-0.5">Input</label>
                    <input type="text" placeholder="meh" className="w-full p-0.5 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500 text-[10px]"/>
                 </div>

                {/* Color Swatches */}
                <div className="w-auto flex flex-col space-y-0.5 p-1.5 bg-white dark:bg-gray-800 rounded">
                    <div className="flex space-x-0.5">
                        <div className="w-4 h-4 rounded-full bg-boring-offwhite border border-gray-300 dark:border-gray-600"></div>
                        <div className="w-4 h-4 rounded-full bg-boring-gray"></div>
                        <div className="w-4 h-4 rounded-full bg-boring-dark"></div>
                         <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                    </div>
                    <code className="text-gray-500 dark:text-gray-400 text-[9px]">Colors</code>
                </div>
                
                {/* Tabs Snippet */}
                 <div className="w-[35%] flex-grow p-2 bg-white dark:bg-gray-800 rounded">
                    <div className="flex space-x-1 border-b border-gray-200 dark:border-gray-700 mb-0.5">
                        <div className="pb-0 border-b-2 border-blue-500 font-medium text-blue-600 dark:text-blue-400">Tab 1</div>
                        <div className="pb-0 text-gray-500 dark:text-gray-400">Tab 2</div>
                    </div>
                     <p className="text-gray-500 dark:text-gray-400 text-[9px] leading-tight">Content...</p>
                 </div>

                {/* Badge Example */}
                <div className="w-auto p-2 bg-white dark:bg-gray-800 rounded flex items-center justify-center">
                    <span className="inline-flex items-center px-1.5 py-0 rounded-full font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200">
                        Badge
                    </span>
                 </div>

                 {/* Alert Snippet */}
                 <div className="w-auto p-2 bg-white dark:bg-gray-800 rounded flex items-center flex-grow">
                     <div className="w-full px-1 py-0.5 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded text-red-700 dark:text-red-200">
                         <strong className="font-medium text-[10px]">Alert!</strong>
                     </div>
                 </div>

                 {/* Avatar Snippet */}
                 <div className="w-auto p-2 bg-white dark:bg-gray-800 rounded flex items-center justify-center space-x-1">
                    <span className="inline-block h-5 w-5 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-600">
                         <svg className="h-full w-full text-gray-400 dark:text-gray-500" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    </span>
                     <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-boring-slate text-white text-[9px] font-medium">
                        BD
                    </span>
                 </div>

                 {/* Progress Snippet */}
                 <div className="w-[20%] flex-grow p-2 bg-white dark:bg-gray-800 rounded flex flex-col justify-center">
                     <label className="text-gray-500 dark:text-gray-400 mb-0.5 text-[9px]">Progress</label>
                    <div className="w-full bg-gray-200 rounded-full h-1 dark:bg-gray-700">
                        <div className="bg-blue-600 h-1 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                 </div>
                 
                 {/* Modal Snippet */}
                  <div className="w-full sm:w-[40%] p-2 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 flex flex-col">
                     <h4 className="font-medium mb-0.5 border-b border-gray-200 dark:border-gray-700 pb-0.5 text-[10px]">Modal</h4>
                     <p className="text-gray-500 dark:text-gray-400 flex-grow py-0.5 text-[9px] leading-tight">Content...</p>
                     <div className="flex justify-end space-x-1 mt-0.5">
                          <button className="px-1 py-0 bg-gray-100 dark:bg-gray-700 rounded text-[9px]">Cancel</button>
                          <button className="px-1 py-0 bg-blue-500 text-white rounded text-[9px]">OK</button>
                     </div>
                  </div>

                 {/* Checkbox/Radio Snippet */}
                 <div className="w-auto p-2 bg-white dark:bg-gray-800 rounded flex items-center space-x-1">
                     <input type="checkbox" defaultChecked className="h-3.5 w-3.5 text-blue-600 border-gray-300 dark:border-gray-600 rounded focus:ring-0 dark:bg-gray-700" />
                     <input type="radio" name="collage-radio-hero" defaultChecked className="h-3.5 w-3.5 text-blue-600 border-gray-300 dark:border-gray-600 focus:ring-0 dark:bg-gray-700" />
                 </div>
                 
                 {/* Tooltip Snippet */}
                 <div className="w-auto p-2 bg-white dark:bg-gray-800 rounded flex items-center justify-center">
                     <div className="relative group"> {/* Added group */}
                        <button className="border border-dashed p-0.5 rounded border-gray-400 dark:border-gray-600 text-gray-500 dark:text-gray-400 text-[10px]">Hover?</button>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:block px-1 py-0 bg-boring-dark text-boring-offwhite rounded whitespace-nowrap shadow-lg z-10 text-[9px]">
                            Tooltip!
                            <svg className="absolute text-boring-dark h-1 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255" xmlSpace="preserve"><polygon className="fill-current" points="0,0 127.5,127.5 255,0"/></svg>
                        </div>
                    </div>
                 </div>

            </div>
        </ScrollReveal>
    </section>
);

// Optionally add default export if needed, or keep as named export
// export default ComponentCollageHero; 