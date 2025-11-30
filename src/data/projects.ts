export type ThemeColor = 'purple' | 'green' | 'orange' | 'yellow';

export type Theme = {
  id: string;
  label: string;
  description: string;
  color: ThemeColor;
};

export type ProjectContentBlock =
  | {
      type: 'text';
      content: string;
    }
  | {
      type: 'image';
      src: string;
      alt: string;
      caption?: string;
    }
  | {
      type: 'video';
      src: string;
      caption?: string;
    }
  | {
    type: 'code';
    code: string;
  };

export type ProjectContentEntry = ProjectContentBlock | string;

export const themes: Theme[] = [
  {
    id: 'MA',
    label: 'Making Anything',
    description: 'Small projects',
    color: 'yellow',
  },
  {
    id: 'DBLT',
    label: 'Design for biomaterials and low tech',
    description: 'Works relating to biomaterials and living things',
    color: 'green',
  },
  {
    id: 'CS',
    label: 'Computer Science & Electronics',
    description: 'Electronics, Networks and Programming',
    color: 'purple',
  },
];

export const themeLookup = themes.reduce<Record<string, Theme>>((acc, theme) => {
  acc[theme.id] = theme;
  return acc;
}, {});

export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  theme: Theme['id'];
  category: string;
  github?: string;
  demo?: string;
  ad?: {
    src: string;
    link?: string;
  };
  hasPage?: boolean;
  pageContent?: ProjectContentEntry[];
  highlights?: string[];
};

export const projects: Project[] = [
  //Glitching
  {
    slug: 'glitching',
    title: 'Glitching',
    description:
      'playing around with blender model files with Hexedit',
    tags: ['Blender', 'Hexedit'],
    theme: 'MA',
    category: 'MA',
    ad: {
      src: '/projects_media/glitching/glitch_ad.png',
      link: 'page',
    },
    pageContent: [
      'Objective: distort a 3D model blender file by altering the binary values for a workshop',
      'Process',
      'Step 1, Open Blender and find an unsuspecting 3D model',
      {
        type: 'image',
        src: '/projects_media/glitching/BGlitch1.png',
        alt: '3D Model',
      },
      'Step 2, load the model file on HexEdit',
      'Step 3, change the values at random by rolling dices',
      {
        type: 'image',
        src: '/projects_media/glitching/BGlitch2.png',
        alt: 'Hexedit',
      },
      'Step 4, Load the glitched files back in Blender',
      'Step 5, Realise that blender refuses to open the file',
      'Step 6, go back to step 2',
      "How did it go ? Didn't work...",
      {
        type: 'image',
        src: '/projects_media/glitching/pain.png',
        alt: 'pain',
      },
    ],
    highlights: [
      'I tried with persistence',
    ],
  },

  //3D pen
  {
    slug: '3d-printed-pen',
    title: '3D printed pen',
    description: 'A small object I have made using a 3D printer',
    tags: ['Blender', 'OrcaSlicer'],
    theme: 'MA',
    category: 'MA',
    ad: {
      src: "/projects_media/3D_pen/print_ad.png",
      link: 'page',
    },
    pageContent: [
      'Overview',
      'In the circumstances of the A4 How To Make (Almost) Anything class',
      'I had to design and print a 3D object, either a pen or a whistle, I chose to make a pen with a 20 faced dice on top',
      {
        type: 'image',
        src: "/projects_media/3D_pen/3Dpen10.png",
        alt: "the pen",
      },
      'Process',
      'The 1st step is to measure the dimensions of the standard bic pen using a ruler:',
      '- the base of the ink container is 4mm wide',
      '- the base of the point is 5 mm wide',
      '- the pen itself is 8mm wide and 13.5mm high',
      {
        type: 'image',
        src: "/projects_media/3D_pen/3Dpen3.png",
        alt: "the pen",
      },
      'Modelling',
      'started by putting toggether a cylinder and a geode to make up the basic idea making sure to adjust for the measurements, making the pen to be 17cm high',
      'extrude the volume (4mm wide) making a pen hole',
      {
        type: 'image',
        src: "/projects_media/3D_pen/3Dpen4.png",
        alt: "the pen",
      },
      'add the 20 on top of the dice using the text object and clipping it on the surface of the dice using the magnet tool',
      'and a bevel to make the tip of the pen, leaving the very end of the tip 1mm thick',
      {
        type: 'image',
        src: "/projects_media/3D_pen/3Dpen6.png",
        alt: "the pen",
      },
      'Print time',
      'using orcaslicer, we cut the pen in half for printing,',
      "otherwise supports could be printed inside the pen wich isn't ideal",
      {
        type: 'image',
        src: "/projects_media/3D_pen/3Dpen8.png",
        alt: "the pen",
      },
      "Then let the printer do it's magic",
      "When the print is done, remove the supports to get the full piece",
      "stick the two parts together, sand the contour and voila. The pen is done :D"

    ],
    highlights: [
      'Designed, Modeled and printed my pen'
    ]
  },

  //Cardboard Scarab
  {
    slug: 'cardboard-scarab',
    title: 'Cardboard scarab',
    description: 'A layered cardboard scarab made with custom cutouts from a digital template.',
    tags: ['Cardboard', 'Draw.io', 'Cutting machine'],
    theme: 'MA',
    category: 'MA',
    ad: {
      src: '/projects_media/scarab/scarab_ad.png',
      link: 'page',
    },
    pageContent: [
      'Overview',
      'For the A4 How To Make (Almost) Anything class I used the cutting machine to create a rhino scarab inspired by an image I found online.',
      {
        type: 'image',
        src: '/projects_media/scarab/Scarab1.jpg',
        alt: 'Original scarab reference template',
      },
      'Process',
      'Cutout design',
      "Using draw.io I traced a simplified outline with assembly slots. It's not CAD, but it's the tool I'm most comfortable with so iteration was faster.",
      {
        type: 'image',
        src: '/projects_media/scarab/Scarab2.png',
        alt: 'Draw.io outline of the scarab',
      },
      {
        type: 'image',
        src: '/projects_media/scarab/Scarab3.png',
        alt: 'Additional detailing in the vector plan',
      },
      'Send to the cardboard cutter',
      'Through Cicad I converted the STL into instructions the cutting machine could understand.',
      {
        type: 'image',
        src: '/projects_media/scarab/Scarab4.png',
        alt: 'Programming the cutter with Cicad',
      },
      {
        type: 'image',
        src: '/projects_media/scarab/Scarab5.jpg',
        alt: 'Cardboard sheet as the cutter works',
      },
      'The cutter did not finish every path so I completed a few edges with a scalpel.',
      {
        type: 'image',
        src: '/projects_media/scarab/Scarab6.jpg',
        alt: 'Cleaning cuts manually',
      },
      'Assembling',
      {
        type: 'image',
        src: '/projects_media/scarab/Scarab7.jpg',
        alt: 'Freshly cut scarab pieces',
      },
      'I enlarged some slots and glued pieces progressively.',
      {
        type: 'image',
        src: '/projects_media/scarab/Scarab8.jpg',
        alt: 'Stacking and gluing the body',
      },
      {
        type: 'image',
        src: '/projects_media/scarab/Scarab10.jpg',
        alt: 'Mid-assembly progress shot',
      },
      'Assembly order: first the front.',
      {
        type: 'image',
        src: '/projects_media/scarab/Scarab9.jpg',
        alt: 'Completed front section',
      },
      'Then the back shell.',
      {
        type: 'image',
        src: '/projects_media/scarab/Scarab11.jpg',
        alt: 'Back portion attached',
      },
      'Add the legs.',
      {
        type: 'image',
        src: '/projects_media/scarab/Scarab12.jpg',
        alt: 'Legs glued into place',
      },
      'Finish with the horn.',
      {
        type: 'image',
        src: '/projects_media/scarab/Scarab13.jpg',
        alt: 'Horn finishing detail',
      },
      'I was supposed to cut two horns but only produced one, so the final creature is unintentionally asymmetrical.',
    ],
    highlights: [
      'Created a highly layered cardboard form from simple 2D outlines.',
      'Balanced machine cutting with hand finishing to reach the final quality.',
    ],
  },

  //Mycelium
  {
    slug: 'growing-mycelium',
    title: 'Growing mycelium substrate & object',
    description:
      'Documented the full workflow for cultivating, molding, and finishing a mycelium-based object.',
    tags: ['Biomaterials', 'Mycelium', 'Fabrication'],
    theme: 'DBLT',
    category: 'DBLT',
    ad: {
      src: '/projects_media/mycelium/mycelium_ad.png',
      link: 'page',
    },
    pageContent: [
      'Growing mycelium, the basics',
      'Step 1: Sterilize the tools so the mycelium is not overtaken by bacteria. I used alcohol on gloves, the bag, spoon, and mold.',
      {
        type: 'image',
        src: '/projects_media/mycelium/mycelium1.jpg',
        alt: 'Sterilizing mycelium tools',
        caption: 'Everything that will touch the substrate gets cleaned before we start.',
      },
      'Step 2: Blend the substrate by breaking down any clumped pieces that are too dense.',
      'Step 3: Add accelerant and water. About 10% of the total volume in mycelium flour and roughly 20% in water until the mix becomes a sticky paste.',
      {
        type: 'image',
        src: '/projects_media/mycelium/mycelium3.jpg',
        alt: 'Mixing accelerant and water into the substrate',
      },
      'Step 4: Molding. Pack the paste tightly so there are no trapped air bubbles, ensuring a solid result after growth.',
      {
        type: 'image',
        src: '/projects_media/mycelium/mycelium4.jpg',
        alt: 'Filling the mycelium mold',
      },
      'Step 5: Incubate. Label the mold with name and date before moving it to the incubator. This batch needed about 10 days.',
      'Step 6: Unmold the piece, clean the edges with a knife, and remove any excess material.',
      {
        type: 'image',
        src: '/projects_media/mycelium/mycelium7.jpg',
        alt: 'Cleaning the mycelium object after incubation',
      },
      'Step 7: Bake for two sessions of roughly three hours at about 70C to stop the growth and dry the object thoroughly.',
      {
        type: 'image',
        src: '/projects_media/mycelium/mycelium9.jpg',
        alt: 'Baking the mycelium object',
      },
      'Object presentation slides',
      {
        type: 'image',
        src: '/projects_media/mycelium/Diapositive1.png',
        alt: 'Slide 1 of the mycelium presentation deck',
      },
      {
        type: 'image',
        src: '/projects_media/mycelium/Diapositive2.png',
        alt: 'Slide 2 of the mycelium presentation deck',
      },
      {
        type: 'image',
        src: '/projects_media/mycelium/Diapositive3.png',
        alt: 'Slide 3 of the mycelium presentation deck',
      },
      {
        type: 'image',
        src: '/projects_media/mycelium/Diapositive4.png',
        alt: 'Slide 4 of the mycelium presentation deck',
      },
      {
        type: 'image',
        src: '/projects_media/mycelium/Diapositive5.png',
        alt: 'Slide 5 of the mycelium presentation deck',
      },
      {
        type: 'image',
        src: '/projects_media/mycelium/Diapositive6.png',
        alt: 'Slide 6 of the mycelium presentation deck',
      },
      {
        type: 'image',
        src: '/projects_media/mycelium/Diapositive7.png',
        alt: 'Slide 7 of the mycelium presentation deck',
      },
      {
        type: 'image',
        src: '/projects_media/mycelium/Diapositive8.png',
        alt: 'Slide 8 of the mycelium presentation deck',
      },
    ],
    highlights: [
      'Captured each fabrication step from sterilization to baking for future reference.',
      'Prepared a complete presentation deck to communicate the process and results.',
    ],
  },

  //Scoby sensors
  {
    slug: 'scoby-sensors',
    title: 'Scoby sensors',
    description: 'Growing and slicing electronic sensors into Kombucha scoby to explore soft bio-electronics.',
    tags: ['Biomaterials', 'Electronics', 'Arduino', 'Sensors'],
    theme: 'DBLT',
    category: 'DBLT',
    ad: {
      src: '/projects_media/scoby/scoby_ad.png',
      link: 'page',
    },
    pageContent: [
      'Overview',
      'Symbiotic Culture of Bacteria and Yeast (SCOBY) is a cellulose-based biofilm produced while fermenting kombucha. By embedding conductive elements in a living sheet I can explore capacitive touch, bend, and heat sensing.',
      'The goal of this experiment is to grow sensors directly inside the scoby mat as well as laminate them during slicing, then prototype electronics to read each modality.',
      'Growing a scoby sheet',
      'Scoby grows as a byproduct of kombucha, so the process starts by brewing a large batch of sweet tea.',
      'For 1L of kombucha I used: 6 g of tea, 300 g of sugar (half white, half brown), 800 g of boiling water, 100 g of vinegar, and 100 g of starter scoby.',
      {
        type: 'image',
        src: '/projects_media/scoby/scoby1.webp',
        alt: 'Mixing water, tea, and sugar for scoby growth',
      },
      {
        type: 'image',
        src: '/projects_media/scoby/scoby3.webp',
        alt: 'Letting the kombucha preparation cool down',
      },
      'Mix everything in a large tray, let it cool, then blend the scoby into small pieces and add vinegar.',
      'Cover the tray with plastic film, poke a small hole, tape it with medical tape for aeration, and move it to an incubator.',
      {
        type: 'image',
        src: '/projects_media/scoby/scoby6.webp',
        alt: 'Scoby incubating',
      },
      {
        type: 'image',
        src: '/projects_media/scoby/scoby8.webp',
        alt: 'Close look at the growing scoby layer',
      },
      {
        type: 'image',
        src: '/projects_media/scoby/scoby10.webp',
        alt: 'Scoby mat forming on the surface',
      },
      {
        type: 'image',
        src: '/projects_media/scoby/scoby11.webp',
        alt: 'Ready-to-harvest scoby sheet',
      },
      'Embedding sensors while growing',
      'The capacitive touch pad is 3D printed with conductive PLA, while the stretch sensor uses a strip of conductive fabric. Both were sterilized before embedding.',
      'Each sensor rests on top of the scoby bath and is periodically covered with additional medium via syringe during growth.',
      {
        type: 'image',
        src: '/projects_media/scoby/scoby12.webp',
        alt: 'Positioning sensors on the scoby surface',
      },
      {
        type: 'image',
        src: '/projects_media/scoby/scoby13.webp',
        alt: 'Adding medium over the embedded sensors',
      },
      {
        type: 'image',
        src: '/projects_media/scoby/scoby14.webp',
        alt: 'Sensors fully encapsulated by the scoby layer',
      },
      'Once the scoby grows over the sensors, the sheet is removed, rinsed, and dried in a dehydrator at 50°C for about four hours.',
      {
        type: 'image',
        src: '/projects_media/scoby/scoby15.webp',
        alt: 'Freshly harvested scoby sensor sheet',
      },
      {
        type: 'image',
        src: '/projects_media/scoby/scoby16.webp',
        alt: 'Drying the scoby sheet in a dehydrator',
      },
      {
        type: 'image',
        src: '/projects_media/scoby/scoby17.jpg',
        alt: 'Fully dried scoby sensor samples',
      },
      'Embedding sensors by slicing',
      'For the resistive heat sensor, a thin copper wire is threaded between two scoby sheets. The wire expands with temperature and changes resistance.',
      'The sheet is rinsed, split in half, and the copper is laced with needles before sandwiching and pressing to remove air bubbles.',
      {
        type: 'image',
        src: '/projects_media/scoby/scoby18.webp',
        alt: 'Copper wire sandwiched between scoby sheets',
      },
      'Testing the sensors',
      'Small connection pads are exposed with a scalpel, then electronic leads are sewn with conductive thread and reinforced with careful soldering.',
      {
        type: 'image',
        src: '/projects_media/scoby/scoby20.jpg',
        alt: 'Preparing to solder leads onto the scoby sensors',
      },
      'Capacitive touch sensor setup',
      'The circuit uses a 100 kΩ resistor and the CapacitiveSensor Arduino library to smooth input readings.',
      "Capacitive touch sketch (excerpt):",
      {
        type: 'code',
        code: 
`//Libraries
#include <CapacitiveSensor.h>
const int numReadings = 10;
long readings[numReadings];
long total = 0;
const int sensitivity = 1000;
const int thresh = 200;
CapacitiveSensor cs = CapacitiveSensor(2, 3);

void loop() {
  Serial.println(smooth());
  delay(250);
}`
      },
      {
        type: 'video',
        src: '/projects_media/scoby/capacitive%20demo.mp4'
      },
      'Resistive stretch sensor setup',
      'A 100 kΩ resistor and 1 pF capacitor feed an analog pin while averaging the signal to keep it stable.',
      "Stretch sensor loop (excerpt):",
      {
        type: 'code',
        code:
`const int numReadings = 10;
long readings[numReadings];
int readIndex = 0;
long total = 0;
int sensor = A3;

void loop() {
  Serial.println(smooth());
  delay(250);
}`
      },
      {
        type: 'video',
        src: '/projects_media/scoby/stretch%20demo.mp4',
      },
      'Resistive heat sensor attempt',
      'A Wheatstone bridge tuned for a baseline 2 Ω sensor was planned, with measurements amplified through a differential stage for better readability.',
      {
        type: 'image',
        src: '/projects_media/scoby/scoby23.jpg',
        alt: 'Wheatstone bridge test setup for the heat sensor',
      },
      'In practice the copper wire oxidized too quickly when the tips were burnt to ensure conductivity, which damaged the sensor and prevented reliable measurements.',
      {
        type: 'image',
        src: '/projects_media/scoby/opamp-opamp57.webp',
        alt: 'Differential amplifier reference diagram',
      },
      'Copper has a temperature coefficient of roughly 0.0039 per °C, so about 0.05 V of bridge imbalance should appear for a 10 °C change at 2 Ω—future iterations will focus on protecting the leads to capture that delta.',
    ],
    highlights: [
      'Grew and dried kombucha scoby sheets specifically for embedding conductive elements.',
      'Prototyped capacitive, stretch, and heat sensing approaches using low-cost Arduino-friendly circuits.',
      'Documented the materials, recipes, and calculations needed to iterate on bio-based sensor skins.',
    ],
  },

  //Websocket
  {
    slug: 'websocket',
    title: 'Websocket',
    description:
      'Websocket to send messages between an ESP32 network connected card and my computer',
    tags: ['ESP32', 'Websocket', 'Network'],
    theme: 'CS',
    category: 'CS',
    github: 'https://github.com/ISDriss/web_workshop',
    ad: {
      src: '/projects_media/websocket.png',
      link: 'https://github.com/ISDriss/web_workshop',
    },
    hasPage: false,
  },  

  //FPGA workshop
  {
    slug: 'FPGA-workshop',
    title: 'FPGA workshop',
    description: 
    'Making a video synthesyzer from a FPGA iceCube using Verilog, link to Notion report (in french)',
    tags: ['FPGA', 'Verilog'],
    theme: 'CS',
    category: 'CS',
    ad: {
      src: '/projects_media/FPGA_ad.png',
      link: 'https://futuristic-strand-e16.notion.site/Rapport-et-R-sultats-Projet-FPGA-2ae11ccf8fec81388064e4859e146bfd',
    },
    hasPage: false,
    demo: 'https://futuristic-strand-e16.notion.site/Rapport-et-R-sultats-Projet-FPGA-2ae11ccf8fec81388064e4859e146bfd'
  },

  //Quickstarter
  {
    slug: 'quickstarter',
    title: 'kickstarter project',
    description: 'As part of my studies, I worked on launching a product on kickstarter. Working on all aspects: product design, production, marketing and delivery',
    tags: ['Product design', 'marketing', 'project management'],
    theme: 'MA',
    category: 'MA',
    demo: 'https://www.kickstarter.com/projects/2046457781/quickstarter-tic-tac-cheers',
    ad: {
      src: '/projects_media/quickstarter_ad.png',
      link: 'https://www.kickstarter.com/projects/2046457781/quickstarter-tic-tac-cheers',
    },
    hasPage: false,
  }

  //Add more here
];
