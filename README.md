# The Unheld

A multi-page emotional wellness and counselling website designed to provide a safe, private and welcoming environment for individuals seeking emotional support. The platform introduces The Unheld's sanctuary-based experiences, counselling services, outreach programmes and wellness solutions for corporates, schools and colleges.

## Project Overview

- **Project Name:** The Unheld
- **Project Type:** Multi-Page Business Website
- **Industry:** Emotional Wellness & Counselling
- **Founded:** 2025
- **Location:** Chennai, Tamil Nadu, India
- **Service Coverage:** Tamil Nadu
- **Website:** theunheld.in

## About The Unheld

The Unheld was founded on the belief that people carrying guilt, shame, emotional struggles and unspoken experiences deserve a safe place to express themselves without judgment.

The website presents a non-clinical, home-like environment focused on privacy, compassionate listening and emotional support.

The platform is organised around five distinct sanctuaries, individual outreach services and dedicated wellness programmes for organisations and educational institutions.

## Website Pages

### 1. Home — `index.html`

The main landing page introduces The Unheld and its approach to emotional wellness.

Key sections include:

- Hero section with rotating headline messages
- Introduction to The Unheld
- Five sanctuary highlights
- Sanctuary navigation and discovery
- Anonymous user reflections and testimonials
- Appointment and sanctuary booking section
- Newsletter subscription interface
- Final call-to-action section
- Contact information and footer

### 2. About — `about.html`

Introduces the organisation, its background and its approach to emotional support.

Key sections include:

- About Us hero section
- Company story and founding background
- The Unheld's non-clinical approach
- Privacy and anonymous entry
- Theme-based healing spaces
- Compassionate and judgment-free environment
- Organisation promise and values

### 3. Sanctuaries — `sanctuaries.html`

Showcases five thoughtfully designed spaces, each representing a different emotional experience.

| Sanctuary | Focus |
|---|---|
| The Confessional | Emotional release, confidential conversations and compassionate listening |
| The Tide Room | Stress management, emotional balance and navigating life's challenges |
| The Root Room | Exploring underlying emotional patterns and past experiences |
| The Mirror Room | Self-discovery, confidence building and personal growth |
| Quiet Corner | Mindful reflection, emotional rest and peaceful conversations |

Additional features:

- Individual sanctuary descriptions
- Sanctuary-specific images and highlights
- Navigation between sanctuary sections
- Sanctuary selection form
- Appointment date selection
- Booking instructions and process information

### 4. We Come To You — `we-come-to-you.html`

Presents The Unheld's outreach service, bringing counselling support to individuals at their homes, offices or other private locations.

Key sections include:

- Home and office visit introduction
- Tamil Nadu outreach information
- Reasons behind the outreach programme
- Step-by-step visit process
- Interactive Tamil Nadu coverage map
- Visit experience and session information
- Service pricing sections
- Frequently asked questions
- WhatsApp contact option

The coverage map displays 24 city and district locations across Tamil Nadu using Leaflet and OpenStreetMap.

### 5. For Organisations — `organisations.html`

A dedicated page for corporate wellness programmes and educational institution support.

The page supports two service contexts through URL query parameters:

- `?context=corporate`
- `?context=school`

**Corporate programmes**

- Individual employee counselling sessions
- Burnout and guilt programmes
- Team wellness workshops
- Anonymous support line
- Wellness audits
- After-hours support

**Schools and colleges**

- Student counselling sessions
- Classroom emotional wellness
- Teacher burnout support
- Parent guidance workshops
- Crisis referral pathways
- Exam-season intensives

Additional sections include:

- Corporate and school programme introduction
- Service benefits and organisational approach
- Programme implementation process
- Pricing and programme packages
- Why Choose The Unheld
- Frequently asked questions
- Organisation enquiry form
- Contact information

## Key Features

- Multi-page responsive website
- Consistent navigation across all pages
- Desktop navigation and custom mobile menu
- Mobile dropdown navigation
- Dynamic hero headline rotation
- Animated content reveal using Intersection Observer
- Sanctuary card navigation
- Automatic testimonial and reflection slider
- Swiper-powered carousel
- Interactive Tamil Nadu coverage map
- Social media sharing functionality
- Newsletter and contact form interfaces
- Sanctuary and organisation enquiry forms
- WhatsApp contact integration
- Custom responsive layouts
- Smooth scrolling and interactive UI elements

## Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Multi-page website structure |
| CSS3 | Styling, layouts, animations and responsive design |
| JavaScript | Interactive elements and website functionality |
| Bootstrap 5.3.3 | Responsive grid and UI components |
| Swiper.js 11.1.15 | Responsive sliders and carousels |
| Leaflet.js 1.9.4 | Interactive Tamil Nadu coverage map |
| OpenStreetMap | Map tile provider |
| Font Awesome | Icon library |
| Bootstrap Icons | Navigation and interface icons |
| Intersection Observer API | Scroll-based reveal animations |

## Design & UI

The website follows a calm, nature-inspired visual identity designed to communicate privacy, comfort and emotional wellbeing.

Design elements include:

- Deep forest-green backgrounds
- Muted green and gold accents
- Warm cream and white surfaces
- Large editorial-style headings
- Image-led storytelling
- Sanctuary-specific visual sections
- Responsive card layouts
- Custom navigation and dropdown menus
- Subtle transitions and scroll animations

## Colour Palette

| Colour | Hex Code | Usage |
|---|---|---|
| Primary | `#17352D` | Main brand background |
| Secondary | `#21473D` | Secondary sections |
| Accent | `#C4A86D` | Highlights and accents |
| Cream | `#F8F5EF` | Light backgrounds |
| White | `#FFFFFF` | Text and surfaces |
| Heading | `#112015` | Main headings |
| Main Green | `#5C9269` | Buttons and highlights |
| Dark Green | `#1D4026` | Hover states |
| Light Green | `#99C7A3` | Secondary highlights |

## Typography

- **Headings:** Philosopher
- **Body Text:** Lato

Custom font files are loaded through CSS `@font-face` declarations.

## JavaScript Functionality

The main `index.js` file manages the website's interactive features.

### Navigation
- Opens and closes the mobile navigation panel.
- Controls the mobile dropdown menu.
- Closes the navigation when a link is selected.
- Supports Escape key and backdrop interactions.
- Updates accessibility attributes such as `aria-expanded` and `aria-hidden`.

### Hero Section
- Rotates between predefined headline messages.
- Applies transition effects when the headline changes.

### Sanctuary Slider
- Generates navigation dots dynamically.
- Supports smooth horizontal scrolling.
- Updates the active navigation indicator.

### Reflections Slider
- Displays rotating anonymous user reflections.
- Automatically changes content.
- Supports manual navigation through indicator buttons.

### Map Integration
- Uses Leaflet to display a Tamil Nadu coverage map.
- Loads OpenStreetMap tiles.
- Displays 24 predefined location markers.
- Provides location tooltips.
- Supports map dragging, touch zoom and double-click zoom.

### Additional Interactions
- Scroll-triggered fade-in animations
- Social sharing for Facebook, X/Twitter, LinkedIn and WhatsApp
- Instagram link-copy functionality
- Bootstrap alert messages
- Newsletter and contact form feedback interfaces

## Project Structure

The following structure represents the uploaded files and their referenced asset paths. The image, font and Bootstrap asset folders should be included in the repository.

```text
The-Unheld/
│
├── index.html
├── about.html
├── sanctuaries.html
├── we-come-to-you.html
├── organisations.html
│
├── css/
│   ├── style.css
│   ├── border.css
│   ├── come-to-you.css
│   ├── organisations.css
│   └── swiper.css
│
├── js/
│   └── index.js
│
├── lib/
│   ├── css/
│   │   ├── bootstrap.min.css
│   │   └── fontawesome.css
│   │
│   └── js/
│       ├── bootstrap.bundle.min.js
│       └── swiper-bundle.min.js
│
├── font/
│   ├── philosopher.ttf
│   └── lato.ttf
│
├── images/
│   ├── logo.png
│   ├── hero/
│   ├── about/
│   ├── 1 confession/
│   ├── 2 tideroom/
│   ├── 3 rootroom/
│   ├── 4 mirrorroom/
│   └── 5 quietcorner/
│
├── icon/
│   └── favicon.ico
│
└── README.md
```

## Installation & Setup

1. Clone the repository.

```bash
git clone <repository-url>
```

2. Navigate to the project directory.

```bash
cd The-Unheld
```

3. Ensure all HTML, CSS, JavaScript, font and image assets are placed in their referenced directories.

4. Run the project using a local development server.

For example, use the VS Code Live Server extension.

5. Open the local website in your browser.

## External Integrations

- **OpenStreetMap:** Provides map tiles for the Tamil Nadu coverage map.
- **Leaflet:** Handles map rendering and location markers.
- **WhatsApp:** Provides direct enquiry links.
- **Social Platforms:** Supports sharing website links.
- **Google Fonts / Local Fonts:** Typography resources, depending on the page and loaded stylesheet.

## Contact Information

**The Unheld**

Website: https://theunheld.in/

## Important Implementation Notes

- The uploaded booking and enquiry forms use placeholder form actions (`action="#"`). A working backend submission service is not established by the supplied files.
- The newsletter and contact form handlers in `index.js` display feedback messages but do not demonstrate database storage or email delivery.
- The map uses predefined coordinates for 24 locations. These markers represent configured map points, not independently verified service availability.
- The organisation page uses URL query parameters to distinguish corporate and school contexts.
- The project requires its referenced image, font and library assets to be present for the complete website to render correctly.

## License

Third-party libraries such as Bootstrap and Swiper retain their respective licenses. Refer to their official documentation for licensing information.
