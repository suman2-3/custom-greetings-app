# Technical Approach

## Problem Solving

The app is built as a client-first experience that allows users to personalize greeting cards without requiring a backend. User state is handled in a React context and persisted in local storage so the profile remains available across refreshes.

### Image Overlay Logic

- The greeting card component renders the selected template image as a background.
- User profile data (name and photo) is layered on top using absolute-positioned elements.
- When the user taps Share, `html2canvas` captures the card container as a single image.
- If the browser supports the Web Share API with files, the generated PNG is shared natively; otherwise, the file is downloaded.
- Free cards also expose download, WhatsApp, and email actions, while premium cards trigger the upsell modal before sharing.

## Tech Stack

- React 19
- React Router DOM 7
- Tailwind CSS 3
- html2canvas for canvas capture
- Create React App for project scaffolding

## Challenges

- Implementing a polished login flow without a backend meant using a mocked Google sign-in and guest flow.
- Sharing generated images required a fallback path for browsers that do not support `navigator.share` with file objects.
- Social apps vary in browser support for attaching generated files, so WhatsApp and email actions share card text while the native share sheet handles file sharing when supported.
- Maintaining a clean, reusable component structure while keeping the app easy to extend.

## Future Improvements

- Add a real backend with authentication, user profiles, and saved galleries.
- Integrate real Google Sign-In / OAuth.
- Add a database for templates, subscription plans, and user favorites.
- Add a complete monetization flow with a payment gateway.
- Expand sharing support with richer email templates, WhatsApp media upload, and Instagram story export.
