# Specification

## Summary
**Goal:** Package the existing React (Vite) app as a downloadable Android APK using a standard WebView wrapper approach, without changing the core gameplay code.

**Planned changes:**
- Add an Android packaging setup (e.g., Capacitor) to build the current web app into an installable Android APK (debug build acceptable).
- Add npm scripts and English documentation for Android prerequisites, setup, running on emulator/device, generating an APK, and the exact reproducible APK output path.
- Configure Android app branding: app name, application/package ID, version code/name, and proper Android launcher/adaptive icons.
- Ensure Vite asset/base URL configuration works correctly when bundled inside the installed APK (no blank screen; game renders on launch).
- Document how any Internet Computer canister URLs or environment-dependent settings are handled for Android builds, and ensure the default APK build has a clear, working default behavior.
- Store and reference any newly generated images as static assets under `frontend/public/assets/generated` (not served via backend).

**User-visible outcome:** A developer can follow documented commands to produce a downloadable Android APK that installs and launches the game successfully with correct branding and icons.
