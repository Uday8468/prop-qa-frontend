// Auto-extracted from index.html — do not hand-edit unless you also update the source.
// Preserves inline HTML (e.g. <code>, <strong>) in list-item strings for
// rendering with dangerouslySetInnerHTML on the React side.

export const PARTS = [
  {
    id: 'p1',
    eyebrow: 'Part 1 of 8',
    title: 'Auth & Onboarding',
    description: 'OTP flow, role selection, session persistence, and onboarding edge cases.',
    count: 24,
    sections: [
      {
        header: 'OTP — Sending',
        tests: [
          {
            id: 'A01',
            tid: 'A-01',
            name: 'Send OTP to New (Unregistered) Number',
            sub: 'OTP request succeeds and countdown timer appears',
            preconditions: [
              'App is on the phone-entry screen (no stored session)',
              'Use a phone number that has never been registered in the app'
            ],
            steps: [
              'Enter a 10-digit number in the phone field (without country code — the field should add +91)',
              'Tap the "Send OTP" button',
              'Observe the screen transition and any timer that appears'
            ],
            passCriteria: [
              'Screen moves to an OTP input field (no page reload, native transition)',
              'A countdown timer is visible, starting at or near 5:00',
              'A "Resend OTP" or equivalent option is visible but disabled/greyed',
              'No error message is shown'
            ],
            failCriteria: [
              'Error message shown for a valid number',
              'App crashes or freezes',
              'No countdown timer appears',
              'Resend is immediately tappable (should be disabled)'
            ]
          },
          {
            id: 'A02',
            tid: 'A-02',
            name: 'Send OTP to Existing (Registered) Number',
            sub: 'Existing users can request a new OTP without error',
            preconditions: [
              'Use test account <code>+919000000002</code> (Ravi Kumar — active tenant, unit A-101, Sunshine Towers)'
            ],
            steps: [
              'Enter <code>9000000002</code> in the phone field',
              'Tap "Send OTP"'
            ],
            passCriteria: [
              'Screen moves to OTP input with countdown timer',
              'No error about "phone already registered" — existing users can still log in'
            ]
          },
          {
            id: 'A03',
            tid: 'A-03',
            name: 'Empty Phone Field — Submit Blocked',
            sub: 'Tapping Send OTP with blank phone does nothing',
            steps: [
              'Leave the phone field completely empty',
              'Tap "Send OTP"'
            ],
            passCriteria: [
              'No API call is made (no spinner)',
              'An inline validation message appears (e.g. "Enter your phone number") OR the button is disabled',
              'App stays on the phone-entry screen'
            ]
          },
          {
            id: 'A04',
            tid: 'A-04',
            name: 'Invalid Phone Number Formats Rejected',
            sub: 'Short, non-numeric, and malformed numbers blocked before API call',
            steps: [
              'Enter <code>12345</code> (5 digits) → tap Send OTP → confirm blocked',
              'Clear field → enter <code>abcdefghij</code> → confirm non-numeric is rejected or not typeable',
              'Clear field → enter <code>00000000000</code> (11 zeros) → tap Send OTP → confirm blocked',
              'Clear field → enter <code>9999999999</code> (valid format, unregistered) → confirm it proceeds normally'
            ],
            passCriteria: [
              'Steps 1–3: No API spinner fires; inline error shown or button stays disabled',
              'Step 4: Proceeds to OTP screen normally (valid format accepted)'
            ]
          }
        ]
      },
      {
        header: 'OTP — Verification',
        tests: [
          {
            id: 'A05',
            tid: 'A-05',
            name: 'Verify OTP — Correct Code, New User',
            sub: 'First-ever login creates account and shows Role Selection',
            preconditions: [
              'OTP sent to a new unregistered number (A-01 passed)'
            ],
            steps: [
              'On the OTP entry screen, enter <code>000000</code> (test OTP)',
              'Tap "Verify OTP" or equivalent',
              'Note which screen appears next'
            ],
            passCriteria: [
              'User is NOT logged into a dashboard — the Role Selection screen appears',
              'Role Selection shows two options: one for Owner/Property, one for Tenant',
              'No error message is shown'
            ],
            failCriteria: [
              'User is sent directly to a dashboard (role selection skipped for a new account)',
              'Error shown for a correct OTP',
              'App crashes'
            ]
          },
          {
            id: 'A06',
            tid: 'A-06',
            name: 'Verify OTP — Correct Code, Existing User',
            sub: 'Returning user lands on their role-specific dashboard',
            preconditions: [
              'Test each account below in a separate sub-run — log out between each'
            ],
            steps: [
              'Login with <code>+919000000002</code> (Ravi Kumar, active tenant) → verify lands on Tenant Home with unit A-101 visible (not role selection)',
              'Login with <code>+919000000007</code> (guard) → verify lands on Guard Dashboard',
              'Login with <code>+919000000001</code> (property admin) → verify lands on Property Admin Dashboard (not "Welcome Aboard")',
              'Login with <code>+919000000009</code> (super_admin) → verify lands on the "Use Web Portal" screen'
            ],
            passCriteria: [
              'Each account routes to the correct screen as listed above',
              'No role selection screen appears for any of these accounts',
              'OTP <code>000000</code> accepted for all'
            ]
          },
          {
            id: 'A07',
            tid: 'A-07',
            name: 'Verify OTP — Wrong Code',
            sub: 'Incorrect OTP shows exact error, user stays on OTP screen',
            preconditions: [
              'OTP sent to any number (registered or new)'
            ],
            steps: [
              'Enter <code>111111</code> in the OTP field (wrong code)',
              'Tap "Verify OTP"',
              'Note the error text displayed',
              'Confirm the user is NOT logged in'
            ],
            passCriteria: [
              'Error message shown: "Incorrect OTP" or equivalent',
              'User stays on the OTP entry screen',
              'No dashboard is shown',
              'OTP field is cleared or highlighted for re-entry'
            ]
          },
          {
            id: 'A08',
            tid: 'A-08',
            name: 'Max OTP Attempts Lockout',
            sub: 'After 5 wrong attempts, OTP is locked and must be resent',
            preconditions: [
              'OTP sent to any number'
            ],
            steps: [
              'Enter <code>111111</code> and tap Verify — fail 1 of 5',
              'Repeat entering wrong OTP 4 more times (total 5 wrong attempts)',
              'After the 5th wrong attempt, note the error message',
              'Now enter <code>000000</code> (correct OTP) and attempt to verify'
            ],
            passCriteria: [
              'After 5 wrong attempts: error "Maximum OTP attempts reached. Request a new OTP." or equivalent',
              'Step 4: even the correct OTP is rejected — the OTP is locked',
              'User must request a new OTP (resend) to continue'
            ]
          },
          {
            id: 'A09',
            tid: 'A-09',
            name: 'OTP Expired — Correct Code Rejected',
            sub: 'An OTP past its 5-minute window is rejected even if correct',
            steps: [
              'Request OTP for any number',
              'Wait until the countdown reaches <code>0:00</code>',
              'Enter <code>000000</code> and tap Verify',
              'Note the error message and check that Resend OTP is now active'
            ],
            passCriteria: [
              'Error: "OTP is invalid or has expired" (exact wording may vary)',
              'User stays on OTP screen — NOT logged in',
              '"Resend OTP" button is now active and tappable'
            ]
          },
          {
            id: 'A10',
            tid: 'A-10',
            name: 'Resend OTP — Countdown Resets, Old OTP Invalidated',
            sub: 'After resend, only the new OTP works',
            steps: [
              'Request OTP. Wait for countdown to expire (0:00). "Resend OTP" becomes active',
              'Tap "Resend OTP" — confirm countdown resets to ~5:00 and Resend becomes disabled again',
              'Enter the old OTP (<code>000000</code> was the first) — it should still be <code>000000</code> for test accounts, but the server should use the new record. Enter and verify.',
              'Confirm login succeeds with the resent OTP'
            ],
            passCriteria: [
              'Countdown resets to ~5:00 on resend',
              'Resend button becomes disabled again after tapping',
              'Verification with the new OTP succeeds'
            ]
          },
          {
            id: 'A11',
            tid: 'A-11',
            name: 'OTP Screen — Empty Field Submit Blocked',
            sub: 'Tapping Verify with blank OTP field does not call the API',
            steps: [
              'Request OTP to reach the OTP entry screen',
              'Leave the OTP field blank (do not enter anything)',
              'Tap "Verify OTP"'
            ],
            passCriteria: [
              'No API call is made (no loading spinner)',
              'Inline validation or disabled button prevents submission',
              'App stays on OTP screen'
            ]
          },
          {
            id: 'A12',
            tid: 'A-12',
            name: 'Back Button from OTP Screen Returns to Phone Entry',
            sub: 'User can correct a wrong number without being stuck',
            steps: [
              'Enter a phone number and tap Send OTP — reach the OTP screen',
              'Tap the back arrow or Android back button',
              'Observe which screen appears',
              'Enter a different phone number and send OTP — confirm it works'
            ],
            passCriteria: [
              'Pressing back returns to the phone entry screen',
              'The phone field is pre-filled or blank (not stuck)',
              'A new OTP can be sent from the phone screen'
            ],
            failCriteria: [
              'App closes or crashes on back press',
              'User is stuck on OTP screen with no way back'
            ]
          }
        ]
      },
      {
        header: 'Role Selection & App Onboarding',
        tests: [
          {
            id: 'A13',
            tid: 'A-13',
            name: 'Role Selection — Choose Owner',
            sub: 'New user picks Owner → routed to Owner dashboard / onboarding',
            preconditions: [
              'New user is on the Role Selection screen (after A-05)'
            ],
            steps: [
              'Tap "I\'m a Property Owner" (or the Owner option)',
              'If a confirmation dialog appears, confirm',
              'Note which screen appears and whether the tab bar is visible'
            ],
            passCriteria: [
              'Screen shows "Welcome Aboard! Let\'s set your first property" (owner onboarding)',
              'Two setup steps visible: "Add Property & Units" and "Add Tenants"',
              'Tab bar is NOT visible yet (property not added)',
              'Role Selection screen is no longer reachable (no back button to it)'
            ]
          },
          {
            id: 'A14',
            tid: 'A-14',
            name: 'Role Selection — Choose Tenant',
            sub: 'New user picks Tenant → sent to Find Apartment screen',
            preconditions: [
              'New user is on the Role Selection screen'
            ],
            steps: [
              'Tap "I\'m a Tenant" (or the Tenant option)',
              'Observe which screen appears'
            ],
            passCriteria: [
              'The "Find Apartment" screen appears (search/lookup flow)',
              'The Tenant Home dashboard does NOT appear yet',
              'Role Selection screen is no longer accessible'
            ]
          },
          {
            id: 'A15',
            tid: 'A-15',
            name: 'App Onboarding — Shows Once on Fresh Install',
            sub: 'Introductory slides appear before login on first launch only',
            preconditions: [
              'Fresh APK install on device OR app data cleared from Android Settings → Apps'
            ],
            steps: [
              'Launch the app for the first time',
              'Wait for the splash screen to complete',
              'Observe whether onboarding intro slides appear before any login screen',
              'Swipe or tap through all slides and reach the final "Get Started" action',
              'Tap Get Started — confirm the phone login screen appears'
            ],
            passCriteria: [
              'Onboarding slides appear between splash and login on first launch',
              'Slides advance correctly (swipe or button)',
              'After completing, phone login screen is shown'
            ]
          },
          {
            id: 'A16',
            tid: 'A-16',
            name: 'Onboarding NOT Repeated on Subsequent Launches',
            sub: 'After completing once, onboarding never appears again',
            preconditions: [
              'A-15 has been completed — onboarding was shown and completed once'
            ],
            steps: [
              'Force-close the app and reopen — onboarding must NOT appear',
              'Log in, then log out, then reopen the app — onboarding must NOT appear',
              'Log in with a different account on the same device — onboarding must NOT appear'
            ],
            passCriteria: [
              'Onboarding slides do NOT appear in any of the 3 checks above',
              'App goes directly to splash → login (or dashboard if session exists) each time'
            ]
          },
          {
            id: 'A17',
            tid: 'A-17',
            name: 'Kill App Mid-Onboarding — Resumes from Start',
            sub: 'Onboarding resets if killed before completion',
            preconditions: [
              'Fresh install with onboarding not yet completed'
            ],
            steps: [
              'Launch the app — onboarding begins',
              'Advance through 1–2 slides (do NOT reach the final Get Started action)',
              'Force-kill the app via Android task switcher',
              'Relaunch the app'
            ],
            passCriteria: [
              'Onboarding starts again from slide 1 (no crash, no blank screen)',
              'Can complete onboarding normally after relaunching'
            ]
          }
        ]
      },
      {
        header: 'Session & Persistence',
        tests: [
          {
            id: 'A18',
            tid: 'A-18',
            name: 'Session Persists After Full App Restart',
            sub: 'No re-login required after force-closing and reopening',
            preconditions: [
              'User is logged in on the dashboard'
            ],
            steps: [
              'Note which dashboard and account is active',
              'Swipe the app away from the Android task switcher (full force-close)',
              'Tap the app icon to reopen',
              'Observe whether OTP is required or if the dashboard appears directly'
            ],
            passCriteria: [
              'No OTP screen — app shows splash then goes directly to the same dashboard as before',
              'Same account is active (correct name/role shown)',
              'App data is not stale or blank — at least the user\'s name appears in the header'
            ]
          },
          {
            id: 'A19',
            tid: 'A-19',
            name: 'Logout Clears Session — Re-login Required',
            sub: 'After logout, OTP is required even if app is restarted',
            steps: [
              'Login as any user — reach the dashboard',
              'Navigate to the profile or "More" tab → tap "Logout"',
              'If a confirmation dialog appears, tap "Yes" or "Logout"',
              'Confirm the app returns to the phone-entry screen immediately',
              'Force-close and reopen the app — confirm the phone-entry screen still appears (not the dashboard)'
            ],
            passCriteria: [
              'Step 4: Phone-entry screen shown immediately after logout',
              'Step 5: After reopen, phone-entry screen shown (not the dashboard)',
              'Dashboard is not accessible by pressing back after logout'
            ]
          },
          {
            id: 'A20',
            tid: 'A-20',
            name: 'Appointed Admin Role Synced at Login',
            sub: 'A newly appointed admin gets property_admin role on next login without role selection',
            preconditions: [
              'A user account exists with no <code>property_admin</code> role (e.g. a fresh test account)',
              'A super_admin or owner appoints that account as property admin for a property'
            ],
            steps: [
              'Appoint the test account as property admin from the web portal or owner dashboard',
              'On the mobile device, log in as the newly appointed user (OTP <code>000000</code>)',
              'Check whether the Role Selection screen appears',
              'Check which dashboard is shown'
            ],
            passCriteria: [
              'Role Selection screen does NOT appear',
              'User lands on the Property Admin Dashboard (not "Welcome Aboard!" owner onboarding)',
              'The assigned property is visible on the dashboard'
            ]
          },
          {
            id: 'A21',
            tid: 'A-21',
            name: 'Revoked Admin Can Be Re-appointed',
            sub: 'No "record already exists" conflict when reinstating a revoked admin',
            preconditions: [
              'A user has been appointed as admin for a property and then revoked'
            ],
            steps: [
              'From the owner dashboard or web admin, attempt to appoint the same user as admin for the same property again',
              'Note whether an error appears or the appointment succeeds',
              'If successful, log in as the re-appointed user',
              'Confirm they can access the Property Admin Dashboard for that property'
            ],
            passCriteria: [
              'Step 1: Re-appointment succeeds — no "record already exists" or conflict error',
              'Step 4: User can log in and reach the Property Admin Dashboard for that property'
            ],
            failCriteria: [
              'Any conflict/duplicate error when re-appointing a revoked admin'
            ]
          }
        ]
      },
      {
        header: 'Network & Error Handling',
        tests: [
          {
            id: 'A22',
            tid: 'A-22',
            name: 'No Network — OTP Send Shows Error, No Crash',
            sub: 'App handles offline state gracefully on login screen',
            steps: [
              'Turn off Wi-Fi and mobile data on the device',
              'Enter a valid phone number and tap "Send OTP"',
              'Note the error shown and whether a spinner is stuck',
              'Re-enable network — attempt Send OTP again — confirm it succeeds'
            ],
            passCriteria: [
              'Error message shown (e.g. "No internet connection" or "Could not connect")',
              'No crash, no frozen spinner',
              'After network restored, Send OTP succeeds normally'
            ]
          },
          {
            id: 'A23',
            tid: 'A-23',
            name: 'No Network — OTP Verify Shows Error, OTP Not Consumed',
            sub: 'Network drop mid-verify does not waste the OTP attempt',
            steps: [
              'Request OTP (network on) — reach OTP screen',
              'Turn off Wi-Fi and mobile data',
              'Enter <code>000000</code> and tap Verify',
              'Confirm error shown and user is NOT logged in',
              'Re-enable network — enter <code>000000</code> again — confirm login succeeds'
            ],
            passCriteria: [
              'Step 4: Network error shown, no crash, user stays on OTP screen',
              'Step 5: Verification with same OTP succeeds after network restores (OTP not consumed by the failed network call)'
            ]
          },
          {
            id: 'A24',
            tid: 'A-24',
            name: 'App Restart With No Network — Cached Session Used',
            sub: 'Offline restart shows dashboard using cached data, no crash',
            steps: [
              'Login and reach the dashboard (network on)',
              'Turn off Wi-Fi and mobile data',
              'Force-close and reopen the app',
              'Observe: does a login screen appear, or is the cached dashboard shown?'
            ],
            passCriteria: [
              'App opens to the dashboard (not the login screen) using cached user data',
              'User\'s name and role are visible in the header',
              'No crash; data-fetch failures show graceful empty states or error banners — not full-screen errors'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'p2',
    eyebrow: 'Part 2 of 8',
    title: 'Owner Flow',
    description: 'Property setup, unit management, tenant invitation, billing, and owner-specific actions.',
    count: 37,
    sections: [
      {
        header: 'Owner Onboarding (First-Time Setup)',
        tests: [
          {
            id: 'B01',
            tid: 'B-01',
            name: 'Owner Onboarding Screen Shown After Role Selection',
            sub: 'Two-step setup UI shown before dashboard is accessible',
            preconditions: [
              'New account — just selected "I\'m a Property Owner" on Role Selection'
            ],
            steps: [
              'Observe the screen that appears after role selection',
              'Check whether a bottom tab bar is visible',
              'Count and note the setup steps shown on screen'
            ],
            passCriteria: [
              'Screen heading contains "Welcome Aboard" or equivalent greeting',
              'Two setup steps visible: one for adding a property/units, one for adding a tenant',
              'Bottom tab bar is NOT visible (it appears only after property is added)',
              'Both steps show as incomplete/unchecked'
            ]
          },
          {
            id: 'B02',
            tid: 'B-02',
            name: 'Add Property — Form Fields and Submission',
            sub: 'Owner fills property details and the property is created successfully',
            steps: [
              'Tap the "Add Property & Units" step card on the onboarding screen',
              'Fill in: Property Name (e.g. "Test Towers"), full Address, City, PIN code, and Property Type',
              'Add at least one unit: unit number (e.g. "101"), type (e.g. "1BHK"), and monthly rent amount',
              'Tap "Save" or "Add Property"',
              'Observe the confirmation and next state'
            ],
            passCriteria: [
              'No error on submission with valid data',
              'A success message or toast appears (e.g. "Property added")',
              'User is returned to the onboarding screen',
              'Step 1 ("Add Property & Units") now shows as completed/checked',
              'Step 2 ("Add Tenants") is still incomplete'
            ],
            edges: [
              '<strong>Empty required field:</strong> submit with property name blank → inline error shown, no API call',
              '<strong>Duplicate property name:</strong> submit same name twice → server should return an appropriate error, not crash'
            ]
          },
          {
            id: 'B03',
            tid: 'B-03',
            name: 'Add Multiple Units to a Property',
            sub: 'Owner can add more than one unit during or after setup',
            steps: [
              'In the Add Property form (or the property detail page after creation), locate the "Add Unit" option',
              'Add unit "101" with type "1BHK" and rent ₹15,000',
              'Add another unit "102" with type "2BHK" and rent ₹25,000',
              'Save and verify both units are listed in the property'
            ],
            passCriteria: [
              'Both units (101 and 102) appear in the unit list for the property',
              'Correct unit type and rent shown for each',
              'No error on adding a second unit'
            ],
            edges: [
              '<strong>Duplicate unit number:</strong> add "101" again → error "Unit already exists" or similar shown'
            ]
          },
          {
            id: 'B04',
            tid: 'B-04',
            name: 'Add Tenant — Invite by Phone Number',
            sub: 'Owner adds a tenant to a unit; tenant receives invite',
            preconditions: [
              'Property and at least one unit exist (B-02 passed)',
              'Use tenant test account <code>+919000000002</code>'
            ],
            steps: [
              'Tap "Add Tenants" step on the onboarding screen',
              'Enter phone <code>9000000002</code> (or use a fresh number for a second test). Select a vacant unit — <strong>B-201</strong> (₹19,500) or <strong>B-202</strong> (₹13,500) are available. Fill rent amount and lease start/end dates.',
              'Tap "Send Invite" or "Add Tenant"',
              'Note confirmation message and any change to Step 2 status'
            ],
            passCriteria: [
              'Success message shown (e.g. "Tenant invited" or "Invite sent")',
              'Step 2 ("Add Tenants") now shows as completed/checked',
              'Unit 101 shows the tenant\'s phone number or name in its record'
            ],
            edges: [
              '<strong>Same phone in two units:</strong> add <code>9000000002</code> to unit B-202 as well → confirm whether allowed or blocked',
              '<strong>Invalid phone:</strong> enter a 5-digit number → inline validation blocks before API call'
            ]
          },
          {
            id: 'B05',
            tid: 'B-05',
            name: 'Dashboard Unlocks After Both Steps Complete',
            sub: 'Tab bar and full dashboard appear once property + tenant are added',
            preconditions: [
              'Both onboarding steps (B-02 and B-04) completed'
            ],
            steps: [
              'With both steps checked, observe the current screen or tap any CTA if present',
              'Check whether the bottom tab bar is now visible (5 tabs: Home, Properties, Billing, Community, More)',
              'Check whether the Home tab now shows an owner dashboard (not the onboarding setup screen)'
            ],
            passCriteria: [
              'Bottom tab bar visible with 5 tabs',
              'Home tab shows owner home dashboard (property summary, rent overview, etc.)',
              'Onboarding setup screen ("Welcome Aboard") is no longer the home screen',
              'Force-closing and reopening the app still shows the dashboard — session persists'
            ]
          }
        ]
      },
      {
        header: 'Owner Home & Properties Tab',
        tests: [
          {
            id: 'B06',
            tid: 'B-06',
            name: 'Owner Home Screen — Key Data Visible',
            sub: 'Dashboard shows property summary and rent status',
            preconditions: [
              'Owner has a property with at least one unit and one tenant (B-05 complete)'
            ],
            steps: [
              'Tap the "Home" tab',
              'Note the greeting and property name shown',
              'Note any rent summary (rent due this month, collected, etc.)',
              'Pull to refresh — confirm data reloads without error'
            ],
            passCriteria: [
              'Owner\'s name or greeting visible in the header',
              'Property name ("Test Towers") is shown',
              'Rent or occupancy summary is shown (not blank)',
              'Pull-to-refresh completes without crash'
            ]
          },
          {
            id: 'B07',
            tid: 'B-07',
            name: 'Properties Tab — Lists All Owner Properties',
            sub: 'All owned properties listed; tapping shows units',
            steps: [
              'Tap "Properties" tab (second tab in the bar)',
              'Verify "Test Towers" is listed',
              'Tap on "Test Towers"',
              'Verify units 101 and 102 are listed (or whichever units were added)',
              'Tap on unit 101 — verify unit details are shown (tenant name/phone, rent, dates)'
            ],
            passCriteria: [
              'Property list shows "Test Towers" with address and unit count',
              'Unit list inside the property shows all added units',
              'Unit detail shows tenant info and rent amount',
              'No blank screens or crashes during navigation'
            ]
          },
          {
            id: 'B08',
            tid: 'B-08',
            name: 'Edit Property Details',
            sub: 'Owner can update property name/address after creation',
            steps: [
              'From the Properties tab, open "Test Towers"',
              'Find and tap the Edit option (pencil icon or "Edit Property")',
              'Change the property name to "Test Towers Updated"',
              'Save — confirm the new name is reflected immediately in the properties list'
            ],
            passCriteria: [
              'Edit form pre-fills with existing data (not blank)',
              'Save succeeds — no error',
              'Updated name ("Test Towers Updated") shows in the property list'
            ]
          },
          {
            id: 'B09',
            tid: 'B-09',
            name: 'Remove a Tenant from a Unit',
            sub: 'Owner can end a tenancy; unit becomes vacant',
            preconditions: [
              'Unit 102 has a tenant (or add one before this test)'
            ],
            steps: [
              'Navigate to Properties → Test Towers → Unit 102',
              'Find the option to remove/end tenancy for the current tenant',
              'If a confirmation dialog appears, confirm',
              'Check that the unit now shows as vacant'
            ],
            passCriteria: [
              'Confirmation dialog appears before deletion',
              'After removal, unit 102 shows as "Vacant" with no tenant name',
              'The removed tenant\'s app session should no longer show an active tenancy (if logged in)'
            ]
          }
        ]
      },
      {
        header: 'Billing Tab',
        tests: [
          {
            id: 'B10',
            tid: 'B-10',
            name: 'Billing Tab — Rent Overview Loads',
            sub: 'Monthly rent data per unit is shown on the Billing screen',
            steps: [
              'Tap "Billing" tab (third tab in the bar)',
              'Note what data is shown (rent due, collected, pending)',
              'Pull to refresh — confirm data reloads'
            ],
            passCriteria: [
              'Billing tab loads without blank screen or crash',
              'Unit 101 appears with its rent amount (₹15,000)',
              'Payment status shown (paid / unpaid)',
              'Pull-to-refresh succeeds'
            ]
          },
          {
            id: 'B11',
            tid: 'B-11',
            name: 'Mark Rent as Received (Manual)',
            sub: 'Owner can manually record rent receipt; status updates to paid',
            steps: [
              'On the Billing tab, tap on Unit 101\'s unpaid rent entry',
              'Find "Mark as Received" or equivalent action',
              'If a form appears, enter payment method (e.g. "Cash"), amount, and date',
              'Confirm — observe status change'
            ],
            passCriteria: [
              'Unit 101\'s rent status changes to "Paid" or "Received"',
              'Payment date shown matches what was entered',
              'No error on save'
            ]
          }
        ]
      },
      {
        header: 'Property Admin Appointment',
        tests: [
          {
            id: 'B12',
            tid: 'B-12',
            name: 'Appoint Property Admin for a Property',
            sub: 'Owner assigns a phone number as admin; user gains property_admin role on next login',
            preconditions: [
              'Use a fresh test account as the new admin (not already a property_admin for this property)'
            ],
            steps: [
              'Navigate to Properties → Test Towers → Admins section (or "Manage Admins")',
              'Tap "Appoint Admin" or "+ Add Admin"',
              'Enter the phone number of the user to appoint',
              'Confirm the appointment',
              'On a second device (or after logout), login as the appointed user — confirm they see the Property Admin Dashboard, not "Welcome Aboard"'
            ],
            passCriteria: [
              'Appointment succeeds with a success message',
              'The appointed user appears in the Admins list for Test Towers',
              'Appointed user\'s login (Step 5) goes directly to Property Admin Dashboard',
              'Appointed user sees "Test Towers" as their assigned property'
            ]
          },
          {
            id: 'B13',
            tid: 'B-13',
            name: 'Revoke Property Admin',
            sub: 'Removing admin access reflects immediately on their next session',
            preconditions: [
              'B-12 completed — there is an active admin for Test Towers'
            ],
            steps: [
              'In the Admins list for Test Towers, find the appointed admin',
              'Tap "Remove" or "Revoke Access" — confirm in the dialog',
              'Admin should disappear from the Admins list',
              'On the revoked user\'s device, logout and log back in — confirm they are no longer routed to the Property Admin Dashboard'
            ],
            passCriteria: [
              'Admin removed from list immediately after revocation',
              'Revoked user\'s fresh login does NOT show the Property Admin Dashboard',
              'Revoked user is asked to select a role (if they had no other role) or lands on their base role\'s screen'
            ]
          }
        ]
      },
      {
        header: 'Profile, More Tab & Verification',
        tests: [
          {
            id: 'B14',
            tid: 'B-14',
            name: 'More Tab — Profile Data Visible and Editable',
            sub: 'Owner\'s name, phone, and email shown; name editable',
            steps: [
              'Tap "More" tab (rightmost tab)',
              'Note the profile section — confirm phone number is shown and name/email can be edited',
              'Update the name field to "QA Test Owner" and save',
              'Navigate away and return — confirm updated name persists'
            ],
            passCriteria: [
              'Phone number shown (read-only, cannot be changed)',
              'Name save succeeds — no error',
              'Updated name ("QA Test Owner") persists after navigating away and returning'
            ]
          },
          {
            id: 'B15',
            tid: 'B-15',
            name: 'Unverified Property — Gating in Effect',
            sub: 'Features that require verification are blocked until super_admin approves',
            preconditions: [
              'The test property has NOT been verified by a super_admin'
            ],
            steps: [
              'As the owner, attempt to access any feature that requires verification (e.g. visitor management, certain billing features)',
              'Note any banner, message, or block shown',
              'On the web portal, log in as super_admin <code>+919000000009</code> and verify the property',
              'On the owner\'s app, pull to refresh or re-navigate — confirm gated features are now accessible'
            ],
            passCriteria: [
              'Step 2: A clear "pending verification" message or blocked state shown (not a crash)',
              'Step 4: After verification, the gated feature becomes accessible without reinstalling/relogging'
            ]
          },
          {
            id: 'B16',
            tid: 'B-16',
            name: 'Notification Badge Updates on More Tab',
            sub: 'Unread notifications count shown as badge on More tab',
            steps: [
              'Trigger a notification for the owner (e.g. a tenant makes a payment or submits a maintenance request)',
              'Navigate to a tab other than "More" and observe the "More" tab icon',
              'Confirm a badge number appears on the "More" tab icon',
              'Tap "More" → Notifications → mark all as read',
              'Confirm badge disappears'
            ],
            passCriteria: [
              'Badge number appears on More tab when there are unread notifications',
              'Badge shows "99+" if there are more than 99 unread',
              'Badge disappears after all notifications are read'
            ]
          }
        ]
      },
      {
        header: 'Property Dashboard',
        tests: [
          {
            id: 'B17',
            tid: 'B-17',
            name: 'Property Dashboard — Units and Stats Overview',
            sub: 'Tap a property card to view per-property detail with unit occupancy',
            preconditions: [
              'Logged in as owner (<code>+919000000001</code>)',
              'At least one property with ≥1 unit has been added'
            ],
            steps: [
              'On Properties tab, tap any property card',
              'Observe the detail screen that opens',
              'Check unit list, occupancy count, and stats tiles'
            ],
            passCriteria: [
              'PropertyDashboard screen loads with the correct property name in the header',
              'Unit list shows all units with occupancy status (Occupied / Vacant)',
              'Stats tiles show correct counts: total units, occupied, vacant',
              'Tapping a unit opens that unit\'s detail/lease info'
            ],
            failCriteria: [
              'Screen is blank or shows 0 units for a property that has units',
              'Wrong property data shown',
              'App crashes on tap'
            ]
          },
          {
            id: 'B18',
            tid: 'B-18',
            name: 'Edit Lease — Change Rent Amount and End Date',
            sub: 'Owner can update rent and lease end date for an active tenant',
            preconditions: [
              'Logged in as owner',
              'At least one unit has an active tenant with a lease'
            ],
            steps: [
              'Navigate to a unit with an active tenant',
              'Tap <strong>Edit Lease</strong> (or gear icon)',
              'Change the Monthly Rent amount to a new value (e.g., ₹12,000)',
              'Change the Lease End Date using the date picker',
              'Tap Save'
            ],
            passCriteria: [
              'EditLease screen opens with existing values pre-filled',
              'Date picker shows native calendar',
              'After Save, screen returns and the updated rent/date are reflected on the dashboard',
              'Success toast or alert appears confirming the update'
            ],
            failCriteria: [
              'Pre-filled values are empty',
              'Save silently fails with no feedback',
              'Date picker crashes or shows wrong year',
              'Old values still shown after returning to previous screen'
            ]
          },
          {
            id: 'B19',
            tid: 'B-19',
            name: 'Renew Expiring Lease — Extend Tenancy Period',
            sub: 'Owner can renew a lease that is expiring soon',
            preconditions: [
              'Logged in as owner',
              'A lease whose end date is ≤30 days away exists'
            ],
            steps: [
              'Navigate to the unit with expiring lease',
              'Tap <strong>Renew Lease</strong>',
              'Set new end date at least 6 months out',
              'Optionally change rent amount',
              'Tap Save/Confirm'
            ],
            passCriteria: [
              'RenewLease form opens with current lease end date as start reference',
              'New end date is saved successfully',
              'Lease shows updated expiry on dashboard',
              'No duplicate lease record created'
            ],
            failCriteria: [
              'Renew button missing for an expiring lease',
              'Form opens with wrong dates',
              'Two lease records appear after renew'
            ]
          },
          {
            id: 'B20',
            tid: 'B-20',
            name: 'Owner Move-Out — Remove Tenant and Vacate Unit',
            sub: 'Owner initiates move-out for a tenant',
            preconditions: [
              'Logged in as owner',
              'A unit with an active tenant exists'
            ],
            steps: [
              'Navigate to the unit with the active tenant',
              'Tap <strong>Move Out</strong> or similar action',
              'Confirm the move-out in the confirmation dialog',
              'Observe unit status change'
            ],
            passCriteria: [
              'Confirmation dialog appears before action (no instant removal)',
              'After confirm: unit status changes to Vacant',
              'Tenant no longer appears in the unit\'s tenant list',
              'Tenant\'s app shows them redirected to Find Apartment or appropriate state'
            ],
            failCriteria: [
              'Move-out happens without confirmation prompt',
              'Unit still shows as occupied after move-out',
              'Error shown but move-out still partially completes'
            ]
          }
        ]
      },
      {
        header: 'Rental Overview, Activity & Needs Attention',
        tests: [
          {
            id: 'B21',
            tid: 'B-21',
            name: 'Rental Overview — Revenue Summary by Unit',
            sub: 'View revenue breakdown across all units for the current month',
            preconditions: [
              'Logged in as owner',
              'At least one unit has a rent payment recorded'
            ],
            steps: [
              'From the Billing tab, tap <strong>Rental Overview</strong> (or navigate to RentalOverview screen)',
              'Observe the revenue summary tiles and unit list',
              'Check if total collected and outstanding amounts are shown'
            ],
            passCriteria: [
              'RentalOverview screen loads without error',
              'Total revenue tile shows sum of received payments for the month',
              'Outstanding amount reflects units with pending rent',
              'Per-unit rows show each unit\'s rent status'
            ],
            failCriteria: [
              'Screen is blank or shows ₹0 for a property with payments',
              'Total doesn\'t match sum of individual unit amounts'
            ]
          },
          {
            id: 'B22',
            tid: 'B-22',
            name: 'Recent Activity Feed — Actions Logged in Order',
            sub: 'View a chronological feed of recent property events',
            preconditions: [
              'Logged in as owner',
              'Property has had activity (tenant added, rent marked, etc.)'
            ],
            steps: [
              'Navigate to RecentActivity screen (via dashboard or sidebar)',
              'Scroll through the activity list'
            ],
            passCriteria: [
              'Activity items are shown newest first',
              'Each item shows action type (e.g., \'Rent received\', \'Tenant added\'), unit, and timestamp',
              'At least the last 5 actions are visible'
            ],
            failCriteria: [
              'Activity list is empty despite recent actions',
              'Items in wrong order (oldest first)',
              'Timestamps show wrong date/time'
            ]
          },
          {
            id: 'B23',
            tid: 'B-23',
            name: 'Needs Attention — Flags for Late Rent and Vacant Units',
            sub: 'NeedsAttention screen surfaces issues requiring owner action',
            preconditions: [
              'Logged in as owner',
              'At least one unit has unpaid rent past due date OR is vacant'
            ],
            steps: [
              'Navigate to NeedsAttention screen (from dashboard card or home banner)',
              'Observe flagged items'
            ],
            passCriteria: [
              'Screen lists units/tenants that need attention',
              'Late rent items show tenant name, unit, days overdue',
              'Vacant units are flagged separately',
              'Tapping an item navigates to the relevant unit or billing screen'
            ],
            failCriteria: [
              'Screen is empty despite known issues',
              'Tapping an item does nothing',
              'Items from a different property appear'
            ]
          }
        ]
      },
      {
        header: 'Receipts, Billing & Charges',
        tests: [
          {
            id: 'B24',
            tid: 'B-24',
            name: 'Receipts & Invoices — View Payment History',
            sub: 'Owner can browse all past payment receipts',
            preconditions: [
              'Logged in as owner',
              'At least one rent payment has been marked as received'
            ],
            steps: [
              'Navigate to ReceiptsInvoices screen (from Billing tab)',
              'Observe the list of receipts',
              'Tap one receipt to view its detail'
            ],
            passCriteria: [
              'Receipt list loads with payment date, tenant, unit, and amount',
              'Tapping a receipt shows a detail view with receipt number, date, amount, payment method',
              'List is sorted newest first'
            ],
            failCriteria: [
              'List is empty despite marked payments',
              'Receipt detail shows wrong amounts',
              'App crashes on tap'
            ]
          },
          {
            id: 'B25',
            tid: 'B-25',
            name: 'Generate Monthly Bills — Bulk Bill Creation',
            sub: 'Owner generates rent bills for all units at once',
            preconditions: [
              'Logged in as owner',
              'At least one occupied unit exists with rent configured'
            ],
            steps: [
              'Go to Billing tab and tap <strong>Generate Bills</strong>',
              'Select the billing month/period if prompted',
              'Confirm generation'
            ],
            passCriteria: [
              'Bills are generated for all occupied units',
              'Each tenant receives a notification (or bill appears in tenant\'s Payments tab)',
              'Success message shows number of bills created',
              'Duplicate bills are NOT created if run again for same period'
            ],
            failCriteria: [
              'Bills generated with ₹0 amount',
              'Bill created for vacant units',
              'App allows duplicate billing for same period without warning'
            ]
          },
          {
            id: 'B26',
            tid: 'B-26',
            name: 'Recurring Charges — Add a Maintenance Charge',
            sub: 'Owner adds a recurring monthly maintenance fee to units',
            preconditions: [
              'Logged in as owner',
              'At least one active unit exists'
            ],
            steps: [
              'Navigate to RecurringCharges (from Billing tab or unit settings)',
              'Tap <strong>Add Charge</strong>',
              'Enter charge name (e.g., \'Maintenance Fee\') and amount (e.g., ₹500)',
              'Select applicable units (all or specific)',
              'Save'
            ],
            passCriteria: [
              'Charge is saved and appears in the recurring charges list',
              'Next bill generation includes this charge in the total',
              'Charge label appears on the generated bill'
            ],
            failCriteria: [
              'Charge saved but not included in next bill',
              'Charge applied to wrong units',
              'Form crashes on saving'
            ]
          }
        ]
      },
      {
        header: 'Visitors, Residents & Emergency',
        tests: [
          {
            id: 'B27',
            tid: 'B-27',
            name: 'Owner Visitors Screen — View Visitor Log',
            sub: 'Owner sees all visitor entries for their properties',
            preconditions: [
              'Logged in as owner',
              'At least one visitor has been checked in by guard'
            ],
            steps: [
              'Navigate to OwnerVisitors screen (from More tab or Properties)',
              'Observe the visitor log'
            ],
            passCriteria: [
              'Visitor list shows visitor name, type, unit, check-in/out time, and approval status',
              'Log includes both pre-registered and walk-in visitors',
              'Date filter or search is functional'
            ],
            failCriteria: [
              'Visitor list is empty despite guard having approved visitors',
              'Shows visitors from a property not owned by this user'
            ]
          },
          {
            id: 'B28',
            tid: 'B-28',
            name: 'Resident Directory — View All Tenants and Family Members',
            sub: 'Owner views contact directory of all residents',
            preconditions: [
              'Logged in as owner',
              'At least one unit has a tenant with a family member added'
            ],
            steps: [
              'Navigate to OwnerResidentDirectory',
              'Browse the contact list'
            ],
            passCriteria: [
              'Directory lists all tenants by unit',
              'Family members appear under their primary tenant',
              'Tapping a resident shows name and phone (masked or full based on settings)'
            ],
            failCriteria: [
              'Directory is empty for an occupied property',
              'Tapping a resident crashes the app'
            ]
          },
          {
            id: 'B29',
            tid: 'B-29',
            name: 'Emergency Contacts — View and Add',
            sub: 'Owner can view and add property emergency contacts',
            preconditions: [
              'Logged in as owner'
            ],
            steps: [
              'Navigate to OwnerEmergencyContacts',
              'Tap <strong>Add Contact</strong> and enter name, role (e.g., \'Plumber\'), and phone',
              'Save and verify it appears in the list'
            ],
            passCriteria: [
              'Contact is saved and listed with name, role, and phone',
              'Existing emergency contacts load without error',
              'Phone number is tappable (initiates call)'
            ],
            failCriteria: [
              'Contact saved but not visible in list',
              'Phone tap does nothing',
              'Form crashes on non-Indian numbers'
            ]
          }
        ]
      },
      {
        header: 'Staff, Managers & Access',
        tests: [
          {
            id: 'B30',
            tid: 'B-30',
            name: 'Staff Management — View and Add Property Staff',
            sub: 'Owner manages non-guard staff (cleaners, maintenance, etc.)',
            preconditions: [
              'Logged in as owner'
            ],
            steps: [
              'Navigate to OwnerStaffManagement',
              'Tap <strong>Add Staff</strong>, enter name, role, and phone',
              'Save and verify listing'
            ],
            passCriteria: [
              'Staff member appears in list with name, role, and join date',
              'Existing staff load correctly on screen open'
            ],
            failCriteria: [
              'Form silently fails to save',
              'Staff list is empty after adding'
            ]
          },
          {
            id: 'B31',
            tid: 'B-31',
            name: 'Staff Attendance — Mark Daily Attendance',
            sub: 'Owner marks staff present or absent for a day',
            preconditions: [
              'Logged in as owner',
              'At least one staff member exists'
            ],
            steps: [
              'Navigate to StaffAttendance',
              'Select today\'s date',
              'Mark one staff member as Present and another as Absent',
              'Save'
            ],
            passCriteria: [
              'Attendance record is saved for the selected date',
              'Present/Absent status reflected for each staff member',
              'Navigating back and returning shows the saved state'
            ],
            failCriteria: [
              'Attendance not saved after returning to screen',
              'Wrong date shown',
              'All staff reset to unmarked after navigation'
            ]
          },
          {
            id: 'B32',
            tid: 'B-32',
            name: 'Appoint Manager — Grant Manager Role to a User',
            sub: 'Owner appoints a manager different from the property admin',
            preconditions: [
              'Logged in as owner',
              'A user account exists to be appointed (<code>+919000000004</code> is manager test account)'
            ],
            steps: [
              'Navigate to AppointManager',
              'Enter the phone number of the user to appoint as manager',
              'Select the property and tap Confirm'
            ],
            passCriteria: [
              'Manager is appointed and appears in Managers list',
              'Appointed user\'s app shows manager-relevant features',
              'Owner can revoke the manager role from the same screen'
            ],
            failCriteria: [
              'Form accepts the number but nothing happens server-side',
              'Manager appointment shows but user doesn\'t have access on their device'
            ]
          },
          {
            id: 'B33',
            tid: 'B-33',
            name: 'Access Requests — Approve or Reject Tenant Applications',
            sub: 'Owner handles pending access requests from prospective tenants',
            preconditions: [
              'Logged in as owner',
              'A new tenant has submitted a request via FindApartment (D-01 precondition)'
            ],
            steps: [
              'Navigate to AccessRequests screen',
              'See the pending request with tenant name and phone',
              'Tap <strong>Approve</strong> for one request and <strong>Reject</strong> for another (if available)'
            ],
            passCriteria: [
              'Approved tenant transitions from \'Pending\' to \'Active\' on their device',
              'Rejected tenant gets a rejection notification and returns to search',
              'Request list updates to remove processed items',
              'Owner can see unit assigned to approved tenant'
            ],
            failCriteria: [
              'Approve/Reject buttons missing',
              'Approved but tenant still sees \'Access Pending\' screen',
              'List not refreshed after action'
            ]
          }
        ]
      },
      {
        header: 'Parking, Settings & Analytics',
        tests: [
          {
            id: 'B34',
            tid: 'B-34',
            name: 'Parking Slot Management — Assign and Release Slots',
            sub: 'Owner manages parking allocation per unit',
            preconditions: [
              'Logged in as owner',
              'Property has parking slots configured'
            ],
            steps: [
              'Navigate to Parking (from PropertyDashboard or More)',
              'Tap <strong>Assign Slot</strong> and select a unit and slot number',
              'Save, then verify assignment',
              'Tap <strong>Release</strong> on an occupied slot'
            ],
            passCriteria: [
              'Slot is assigned to the selected unit and shows as \'Occupied\'',
              'Released slot shows as \'Available\'',
              'No slot can be assigned to two units simultaneously'
            ],
            failCriteria: [
              'Assignment appears saved but reverts on refresh',
              'Same slot assigned to two units',
              'Parking screen crashes on load'
            ]
          },
          {
            id: 'B35',
            tid: 'B-35',
            name: 'Owner Settings — Push Notification Preferences',
            sub: 'Owner configures which push notifications to receive',
            preconditions: [
              'Logged in as owner'
            ],
            steps: [
              'Navigate to OwnerSettings',
              'Toggle off \'Rent Reminders\'',
              'Toggle on \'Payment Alerts\'',
              'Exit and re-enter Settings'
            ],
            passCriteria: [
              'Toggles save immediately (no extra \'Save\' button needed, or Save button works)',
              'Settings persist after navigating away and returning',
              'Settings persist after full app restart'
            ],
            failCriteria: [
              'Toggles reset on navigation',
              'Settings screen is blank',
              'App crashes on toggle'
            ]
          },
          {
            id: 'B36',
            tid: 'B-36',
            name: 'Owner Privacy — Account Settings and Data Control',
            sub: 'Owner can access privacy options (data export, account deletion prompt)',
            preconditions: [
              'Logged in as owner'
            ],
            steps: [
              'Navigate to OwnerPrivacy (from More tab)',
              'Observe options available: data export, account deletion, or similar',
              'If data export available, tap it and observe response'
            ],
            passCriteria: [
              'Privacy screen loads without error',
              'At least one privacy action is available (export / deletion request)',
              'Account deletion shows a confirmation dialog before proceeding'
            ],
            failCriteria: [
              'Screen crashes',
              'Account deletion has no confirmation (immediate action)',
              'No privacy options shown at all'
            ]
          },
          {
            id: 'B37',
            tid: 'B-37',
            name: "Analytics — 'Continue on Desktop' Redirect Screen",
            sub: 'Analytics section redirects mobile users to web portal',
            preconditions: [
              'Logged in as owner'
            ],
            steps: [
              'Navigate to Analytics (from Reports or a dashboard shortcut)',
              'Observe the screen that appears'
            ],
            passCriteria: [
              'Screen shows a message telling the user to view analytics on the web portal',
              'The web portal URL is displayed or a deep link / copy button is available',
              'No analytics data is attempted to be rendered on mobile (correct placeholder)'
            ],
            failCriteria: [
              'Analytics tries to load charts and crashes',
              'Screen is blank with no message',
              'Wrong URL or link shown'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'p3',
    eyebrow: 'Part 3 of 8',
    title: 'Property Admin Flow',
    description: 'Dashboard, tenant management, maintenance requests, notifications, and admin-only actions.',
    count: 33,
    sections: [
      {
        header: 'Login & Dashboard Routing',
        tests: [
          {
            id: 'C01',
            tid: 'C-01',
            name: 'Appointed Admin Lands on Property Admin Dashboard — NOT Onboarding',
            sub: 'Critical regression check: "Welcome Aboard" must never show for an appointed admin',
            preconditions: [
              'Account <code>+919000000001</code> is an appointed admin for at least one property',
              'Account does NOT have the <code>owner</code> role (only <code>property_admin</code>)'
            ],
            steps: [
              'Login as <code>+919000000001</code> with OTP <code>000000</code>',
              'Observe the screen shown immediately after login',
              'Check the screen title, the tab bar, and whether any "setup" steps are visible'
            ],
            passCriteria: [
              'The screen is <em>not</em> "Welcome Aboard! Let\'s set your first property"',
              'The screen is the Property Admin Dashboard (showing the assigned property name and stats)',
              'Bottom tab bar is visible (not hidden)',
              'No role selection screen appears'
            ],
            failCriteria: [
              '"Welcome Aboard" or any owner setup/onboarding screen is shown',
              'Role selection screen appears for an existing appointed admin',
              'Blank screen or crash'
            ]
          },
          {
            id: 'C02',
            tid: 'C-02',
            name: 'Admin Dashboard Shows Correct Property Data',
            sub: 'Assigned property name, unit count, and occupancy visible',
            steps: [
              'On the Property Admin Dashboard (after C-01), read the property name shown at the top',
              'Note the unit count (total units) and occupancy count (occupied vs vacant)',
              'Pull to refresh — confirm data reloads without crash',
              'Cross-check: the property name shown should match what was set by the owner in Part 2 (B-02)'
            ],
            passCriteria: [
              'Property name shown matches the assigned property',
              'Unit count matches the actual number of units in the property',
              'Pull-to-refresh completes without crash',
              'No "Loading…" spinner stuck indefinitely'
            ]
          },
          {
            id: 'C03',
            tid: 'C-03',
            name: 'Session Persists — Dashboard on Restart',
            sub: 'Force-close and reopen sends admin directly to dashboard, not login',
            steps: [
              'Confirm you are on the Property Admin Dashboard',
              'Force-close the app from the Android task switcher',
              'Reopen the app',
              'Observe whether the dashboard appears (not login or "Welcome Aboard")'
            ],
            passCriteria: [
              'App reopens directly to the Property Admin Dashboard',
              'No OTP required',
              'Property name and data visible without extra action'
            ]
          }
        ]
      },
      {
        header: 'Properties & Tenant Management',
        tests: [
          {
            id: 'C04',
            tid: 'C-04',
            name: 'Properties Tab — View Units and Tenants',
            sub: 'Admin can browse units and see tenant details',
            steps: [
              'Tap the "Properties" tab (second tab)',
              'Confirm the assigned property is listed (the admin cannot see properties they are NOT assigned to)',
              'Tap the property → view the unit list',
              'Tap on an occupied unit → confirm tenant name, phone, and lease details are shown'
            ],
            passCriteria: [
              'Only the admin\'s assigned property is shown (not all properties in the system)',
              'Units list with correct names and occupancy status',
              'Occupied unit detail shows tenant info'
            ]
          },
          {
            id: 'C05',
            tid: 'C-05',
            name: 'Admin Cannot Add a New Property',
            sub: 'Property creation is owner-only; admin must not see that option',
            steps: [
              'On the Properties tab, look for any "Add Property" button or "+" button',
              'If any such button is present, tap it and observe what happens'
            ],
            passCriteria: [
              '"Add Property" button does NOT appear anywhere in the admin\'s Properties tab',
              'If a button exists but is disabled, it shows a clear "Owner only" message when tapped'
            ]
          }
        ]
      },
      {
        header: 'Billing Tab',
        tests: [
          {
            id: 'C06',
            tid: 'C-06',
            name: "Billing Tab Loads Rent Data for Admin's Property",
            sub: 'Admin sees the same billing data as the owner for their assigned property',
            steps: [
              'Tap "Billing" tab',
              'Confirm rent data for the assigned property\'s units is shown',
              'Confirm data from OTHER properties is NOT shown',
              'Pull to refresh — confirm no error'
            ],
            passCriteria: [
              'Billing tab loads without crash',
              'Only the admin\'s assigned property billing data is shown',
              'Rent amounts match what the owner set per unit'
            ]
          },
          {
            id: 'C07',
            tid: 'C-07',
            name: 'Admin Can Mark Rent as Received',
            sub: 'Admin has billing write access identical to owner',
            steps: [
              'On the Billing tab, find an unpaid rent entry',
              'Tap it → find "Mark as Received" action',
              'Fill payment details and confirm',
              'Confirm status changes to "Paid"'
            ],
            passCriteria: [
              '"Mark as Received" option exists for admin (not owner-only)',
              'Status updates to "Paid" after confirmation',
              'No permission error'
            ]
          }
        ]
      },
      {
        header: 'Guard Management & Visitor Log',
        tests: [
          {
            id: 'C08',
            tid: 'C-08',
            name: 'Admin Can Appoint a Guard',
            sub: 'Admin assigns a phone number as guard for their property',
            preconditions: [
              'Use test guard account <code>+919000000007</code> as the user to appoint'
            ],
            steps: [
              'Navigate to the Guards section (in Properties tab or dashboard)',
              'Tap "Add Guard" or "Appoint Guard"',
              'Enter <code>9000000007</code> as the guard phone number and confirm',
              'Verify the guard appears in the Guards list',
              'On the guard\'s device, login as <code>+919000000007</code> → confirm they reach the Guard Dashboard'
            ],
            passCriteria: [
              'Guard appointment succeeds with success message',
              'Guard listed in the Guards section for this property',
              'Guard\'s login routes to Guard Dashboard (not any other role\'s screen)'
            ]
          },
          {
            id: 'C09',
            tid: 'C-09',
            name: 'Visitor Log Visible to Admin',
            sub: 'Admin can view visitor history for their property',
            preconditions: [
              'At least one visitor entry exists (created in Part 6 tests or manually)'
            ],
            steps: [
              'Navigate to Visitor Log or Visitor Management section',
              'Confirm visitor entries are listed with: visitor name, host unit, check-in time, status (pending / approved / rejected)',
              'Tap a visitor entry to see full details'
            ],
            passCriteria: [
              'Visitor log loads without crash',
              'Each entry shows name, unit, and status',
              'Admin can see ALL visitors for their property (not just their own unit)',
              'Visitors from OTHER properties are NOT shown'
            ]
          }
        ]
      },
      {
        header: 'Community & Profile',
        tests: [
          {
            id: 'C10',
            tid: 'C-10',
            name: 'Community Tab Loads for Admin',
            sub: 'Admin can view community posts and create notices',
            steps: [
              'Tap "Community" tab',
              'Confirm the community feed loads (posts, notices, or empty-state message)',
              'Find the option to post a notice or announcement (admin-level post)',
              'Create a notice: title "Maintenance Tomorrow", body "Building maintenance scheduled for 10AM"',
              'Confirm the notice appears in the feed'
            ],
            passCriteria: [
              'Community tab loads without crash',
              'Admin can create a notice/post (not just view)',
              'Posted notice appears in the feed immediately',
              'Notice is attributed to the admin (not "unknown")'
            ]
          },
          {
            id: 'C11',
            tid: 'C-11',
            name: 'Admin Subscription Access — Subscription Tab Blocked',
            sub: 'Admin cannot manage subscription — that is owner-only',
            steps: [
              'Navigate to the "More" tab → look for a "Subscription" or "Plan" option',
              'If visible, tap it'
            ],
            passCriteria: [
              'Subscription management is either absent from the admin\'s "More" tab, or if present, shows a "Contact your property owner" or equivalent message',
              'Admin cannot upgrade/downgrade a subscription plan'
            ]
          },
          {
            id: 'C12',
            tid: 'C-12',
            name: 'Admin Logout — Returns to Login, Admin Dashboard Not Accessible',
            sub: 'Session fully cleared; back-button cannot reach admin screens after logout',
            steps: [
              'From the More tab, tap "Logout" and confirm in dialog',
              'Confirm login screen appears immediately',
              'Press the Android back button — confirm the admin dashboard is NOT accessible',
              'Force-close and reopen — confirm login screen (not dashboard) appears'
            ],
            passCriteria: [
              'Step 2: Login screen shown immediately after logout',
              'Step 3: Back button does NOT expose the admin dashboard',
              'Step 4: Fresh launch shows login screen — session fully cleared'
            ]
          }
        ]
      },
      {
        header: 'Admin Settings & Maintenance',
        tests: [
          {
            id: 'C13',
            tid: 'C-13',
            name: 'Admin Settings Screen — Config and Preferences',
            sub: 'PropertyAdmin can access settings screen',
            preconditions: [
              'Logged in as property_admin'
            ],
            steps: [
              'Navigate to PropertyAdminSettings (via More tab or gear icon from dashboard)',
              'Observe available settings options',
              'Toggle any notification preference and verify persistence'
            ],
            passCriteria: [
              'Settings screen loads without error',
              'At least notification preferences are configurable',
              'Changes persist after navigating away and returning'
            ],
            failCriteria: [
              'Settings screen is blank',
              'Changes reset on navigation',
              'App crashes when opening settings'
            ]
          },
          {
            id: 'C14',
            tid: 'C-14',
            name: 'Admin Maintenance Requests — List and Respond',
            sub: 'Admin views pending maintenance requests and marks them resolved',
            preconditions: [
              'Logged in as property_admin',
              'At least one maintenance request submitted by a tenant exists'
            ],
            steps: [
              'Navigate to AdminMaintenance',
              'Observe the list of open requests',
              'Tap one request to open its detail',
              'Change status to \'In Progress\' and then \'Resolved\'',
              'Add a resolution note'
            ],
            passCriteria: [
              'Request list loads with tenant name, unit, description, and status',
              'Status can be changed through the defined workflow',
              'Resolution note is saved and visible',
              'Tenant receives a notification when status changes'
            ],
            failCriteria: [
              'Request list is empty despite existing tickets',
              'Status change silently fails',
              'Admin can\'t add a note'
            ]
          },
          {
            id: 'C15',
            tid: 'C-15',
            name: 'Admin Tenants Screen — View All Tenants Across Units',
            sub: 'Admin sees all tenants with their unit assignments',
            preconditions: [
              'Logged in as property_admin'
            ],
            steps: [
              'Navigate to AdminTenants',
              'Browse the tenant list',
              'Search by tenant name'
            ],
            passCriteria: [
              'All tenants for the property are listed with unit numbers',
              'Search filters results in real-time',
              'Tapping a tenant shows their profile details'
            ],
            failCriteria: [
              'List shows tenants from other properties',
              'Search crashes or shows no results for a known tenant name',
              'Empty list for a property with active tenants'
            ]
          },
          {
            id: 'C16',
            tid: 'C-16',
            name: 'Staff Attendance — Admin Marks Daily Attendance',
            sub: 'Admin records staff presence for operational tracking',
            preconditions: [
              'Logged in as property_admin',
              'At least one staff member is registered for the property'
            ],
            steps: [
              'Navigate to Attendance screen',
              'Select today\'s date',
              'Mark one staff Present, one Absent',
              'Save'
            ],
            passCriteria: [
              'Attendance saved for today\'s date',
              'Status shows correctly on return visit',
              'Historical dates are viewable (read-only)'
            ],
            failCriteria: [
              'Attendance not saved',
              'Can edit historical attendance without any restriction'
            ]
          }
        ]
      },
      {
        header: 'Audit, Disputes & Complaints',
        tests: [
          {
            id: 'C17',
            tid: 'C-17',
            name: 'Audit Logs — View Chronological Action History',
            sub: 'Admin can review all actions taken on the property by all roles',
            preconditions: [
              'Logged in as property_admin'
            ],
            steps: [
              'Navigate to AuditLogs',
              'Browse the log entries',
              'Filter by action type (if available)'
            ],
            passCriteria: [
              'Log entries appear newest-first with actor name, action, and timestamp',
              'At least the last 10 admin/owner/tenant actions are visible',
              'Filter narrows results correctly'
            ],
            failCriteria: [
              'Audit log is empty despite recent activity',
              'Log shows actions from other properties',
              'Timestamps are wrong or missing'
            ]
          },
          {
            id: 'C18',
            tid: 'C-18',
            name: 'Bill Disputes Admin — View and Resolve Tenant Disputes',
            sub: 'Admin handles billing disputes raised by tenants',
            preconditions: [
              'Logged in as property_admin',
              'At least one dispute has been raised by a tenant (see D-15)'
            ],
            steps: [
              'Navigate to BillDisputesAdmin',
              'See the open dispute with tenant name, unit, disputed amount, and reason',
              'Tap the dispute and mark it as Resolved with a note',
              'Optionally adjust the bill amount'
            ],
            passCriteria: [
              'Dispute list loads with open disputes',
              'Dispute detail shows all submitted information',
              'Status changes to Resolved and tenant is notified',
              'Bill adjustment (if made) reflects in tenant\'s Payments screen'
            ],
            failCriteria: [
              'Dispute list is empty despite tenant submission',
              'Resolve action shows no feedback',
              'Tenant\'s bill not updated after adjustment'
            ]
          },
          {
            id: 'C19',
            tid: 'C-19',
            name: 'Complaints — Receive and Respond to Resident Complaints',
            sub: 'Admin manages complaints submitted by tenants',
            preconditions: [
              'Logged in as property_admin',
              'At least one complaint submitted by a tenant'
            ],
            steps: [
              'Navigate to Complaints screen',
              'Open a complaint',
              'Add a response comment',
              'Change status to \'In Progress\' → \'Resolved\''
            ],
            passCriteria: [
              'Complaints list with category, tenant, date, and status',
              'Response comment is saved and visible to the tenant',
              'Status change is reflected in tenant\'s view'
            ],
            failCriteria: [
              'Response silently fails to save',
              'Complaint status remains stuck at \'Open\''
            ]
          },
          {
            id: 'C20',
            tid: 'C-20',
            name: 'Family Members Admin — View All Family Member Records',
            sub: 'Admin can see all registered family members for the property',
            preconditions: [
              'Logged in as property_admin'
            ],
            steps: [
              'Navigate to FamilyMembersAdmin',
              'Browse the list',
              'Search by name'
            ],
            passCriteria: [
              'All approved family members listed with primary tenant and unit',
              'Invite-pending members shown separately',
              'Admin can revoke a family member if needed'
            ],
            failCriteria: [
              'Only own family members shown instead of all property members',
              'Revoke action crashes or silently fails'
            ]
          }
        ]
      },
      {
        header: 'Guards, Incidents & SOS',
        tests: [
          {
            id: 'C21',
            tid: 'C-21',
            name: 'Guards Management — Add and Remove Guards',
            sub: 'Admin manages the guard roster',
            preconditions: [
              'Logged in as property_admin'
            ],
            steps: [
              'Navigate to GuardsManagement',
              'Tap <strong>Add Guard</strong>, enter phone number <code>+919000000007</code>',
              'Save, then verify guard appears in list',
              'Tap <strong>Remove</strong> on the guard and confirm'
            ],
            passCriteria: [
              'Guard added and listed with name and phone',
              'Removed guard no longer appears in list',
              'Removed guard loses guard access on their device'
            ],
            failCriteria: [
              'Guard added but still listed after remove',
              'Guard removal has no confirmation dialog'
            ]
          },
          {
            id: 'C22',
            tid: 'C-22',
            name: 'Incident Log — Create and View Incident Records',
            sub: 'Admin logs security or property incidents',
            preconditions: [
              'Logged in as property_admin'
            ],
            steps: [
              'Navigate to IncidentLog',
              'Tap <strong>New Incident</strong>',
              'Enter incident type, description, date/time, and unit involved',
              'Save and verify it appears in the log'
            ],
            passCriteria: [
              'Incident saved with all entered fields',
              'Log sorted newest first',
              'Historical incidents are viewable'
            ],
            failCriteria: [
              'Incident saved but fields are blank when reopened',
              'Log only shows today\'s incidents, not historical'
            ]
          },
          {
            id: 'C23',
            tid: 'C-23',
            name: 'Managers List — View Appointed Property Managers',
            sub: 'Admin sees who has been appointed as manager',
            preconditions: [
              'Logged in as property_admin',
              'At least one manager has been appointed by the owner (see B-32)'
            ],
            steps: [
              'Navigate to ManagersList',
              'Observe manager entries'
            ],
            passCriteria: [
              'Manager name, phone, appointed date, and property shown',
              'Active vs. revoked managers distinguished'
            ],
            failCriteria: [
              'List is empty despite active manager appointments',
              'Revoked managers still appear as active'
            ]
          },
          {
            id: 'C29',
            tid: 'C-29',
            name: 'SOS Alert History — View Emergency Alerts Sent',
            sub: 'Admin reviews all SOS alerts raised by tenants or guards',
            preconditions: [
              'Logged in as property_admin',
              'At least one SOS alert has been sent'
            ],
            steps: [
              'Navigate to SOSAlertHistory',
              'Browse alert entries'
            ],
            passCriteria: [
              'Alerts listed with sender name, unit, time, and alert type',
              'Sorted newest first',
              'Resolved alerts differentiated from active'
            ],
            failCriteria: [
              'No alerts shown despite known SOS event',
              'Alert timestamps shown in UTC instead of local time'
            ]
          }
        ]
      },
      {
        header: 'Meetings, Expenses & Vendors',
        tests: [
          {
            id: 'C24',
            tid: 'C-24',
            name: 'Meeting Minutes — Create and Publish Society Meeting Record',
            sub: 'Admin records a society meeting with agenda and minutes',
            preconditions: [
              'Logged in as property_admin'
            ],
            steps: [
              'Navigate to MeetingMinutes',
              'Tap <strong>New Meeting</strong>',
              'Enter meeting title, date, attendees (free text), and minutes/notes',
              'Save'
            ],
            passCriteria: [
              'Meeting record saved with all entered fields',
              'Meeting visible in the list with title and date',
              'Tenants can view minutes (verify from tenant account)'
            ],
            failCriteria: [
              'Meeting saved but empty when reopened',
              'Meeting not visible to tenants'
            ]
          },
          {
            id: 'C30',
            tid: 'C-30',
            name: 'Society Expenses — Log and Track Property Expenses',
            sub: 'Admin records society/maintenance expenditures',
            preconditions: [
              'Logged in as property_admin'
            ],
            steps: [
              'Navigate to SocietyExpenses',
              'Tap <strong>Add Expense</strong>',
              'Enter category (e.g., \'Electricity\'), amount, date, and description',
              'Save and verify in list'
            ],
            passCriteria: [
              'Expense saved with all fields',
              'Expense list shows category, amount, date',
              'Monthly total updates to include new expense'
            ],
            failCriteria: [
              'Expense saved with ₹0 amount',
              'Monthly total not updated after save'
            ]
          },
          {
            id: 'C31',
            tid: 'C-31',
            name: 'Vendor Management — Register and View Vendors',
            sub: 'Admin manages service vendors (plumbers, electricians, etc.)',
            preconditions: [
              'Logged in as property_admin'
            ],
            steps: [
              'Navigate to VendorManagement',
              'Tap <strong>Add Vendor</strong>',
              'Enter vendor name, service type, phone, and rating',
              'Save and verify listing'
            ],
            passCriteria: [
              'Vendor appears in list with all entered fields',
              'Service type filter works',
              'Existing vendors load on screen open'
            ],
            failCriteria: [
              'Vendor saved but not visible in list',
              'Phone number not saved correctly'
            ]
          }
        ]
      },
      {
        header: 'Parking, Residents & Polls',
        tests: [
          {
            id: 'C25',
            tid: 'C-25',
            name: 'Parking Slots — Manage Slot Assignments from Admin',
            sub: 'Admin assigns parking slots to units',
            preconditions: [
              'Logged in as property_admin',
              'Property has parking slots'
            ],
            steps: [
              'Navigate to ParkingSlots',
              'Assign a slot to an occupied unit',
              'Verify the assignment',
              'Unassign the slot and verify it shows Available'
            ],
            passCriteria: [
              'Slot shows correct status (Occupied/Available) per assignment',
              'No slot can be double-assigned',
              'Changes saved immediately'
            ],
            failCriteria: [
              'Slot assignment not persisted',
              'Double-assignment allowed without error'
            ]
          },
          {
            id: 'C26',
            tid: 'C-26',
            name: 'People Hub — Directory of All Property Members',
            sub: 'Admin sees a unified directory of all people: tenants, guards, family members',
            preconditions: [
              'Logged in as property_admin'
            ],
            steps: [
              'Navigate to PeopleHub',
              'Browse the list',
              'Filter by role (tenant / guard / family)'
            ],
            passCriteria: [
              'All residents and staff visible with role badges',
              'Filter narrows correctly by role',
              'Tapping a person shows contact details'
            ],
            failCriteria: [
              'Hub empty for an active property',
              'Filter shows wrong results',
              'Tapping a person crashes app'
            ]
          },
          {
            id: 'C27',
            tid: 'C-27',
            name: 'Polls — Create Poll and View Live Results',
            sub: 'Admin creates a poll for residents to vote on',
            preconditions: [
              'Logged in as property_admin'
            ],
            steps: [
              'Navigate to Polls (admin side)',
              'Tap <strong>Create Poll</strong>',
              'Enter poll question and 3 answer options',
              'Set end date and publish',
              'Switch to a tenant account and cast a vote',
              'Return to admin and check results'
            ],
            passCriteria: [
              'Poll created and visible to tenants',
              'Vote from tenant updates result count in real time (or near real time)',
              'Poll shows correct percentages and vote counts',
              'Poll closes after end date passes'
            ],
            failCriteria: [
              'Poll created but not visible to tenants',
              'Vote count not updated',
              'End date not enforced'
            ]
          },
          {
            id: 'C28',
            tid: 'C-28',
            name: 'Resident Directory — Search and Contact Residents',
            sub: 'Admin views a searchable resident list with contact details',
            preconditions: [
              'Logged in as property_admin'
            ],
            steps: [
              'Navigate to ResidentDirectory',
              'Search by name',
              'Search by unit number'
            ],
            passCriteria: [
              'Both search modes return correct results',
              'Contact details (phone) visible per resident',
              'Results are not stale after a new tenant is added'
            ],
            failCriteria: [
              'Search returns empty for a known resident',
              'Search by unit number crashes'
            ]
          }
        ]
      },
      {
        header: 'Announcements & Bookings',
        tests: [
          {
            id: 'C32',
            tid: 'C-32',
            name: 'Create Announcement — Publish a Property Notice',
            sub: 'Admin creates and publishes a notice to all residents',
            preconditions: [
              'Logged in as property_admin'
            ],
            steps: [
              'Navigate to CreateAnnouncement',
              'Enter title, body, and optional image/attachment',
              'Publish',
              'Switch to tenant account and verify notice visible in community feed'
            ],
            passCriteria: [
              'Announcement published and visible in community/notice board',
              'Tenant sees the announcement within 60 seconds',
              'Announcement shows admin as author with timestamp'
            ],
            failCriteria: [
              'Announcement saved but not visible to tenants',
              'Author shown as wrong name'
            ]
          },
          {
            id: 'C33',
            tid: 'C-33',
            name: 'Manage Bookings — View and Approve Amenity Reservations',
            sub: 'Admin oversees all amenity booking requests',
            preconditions: [
              'Logged in as property_admin',
              'A tenant has requested an amenity booking (see G-06)'
            ],
            steps: [
              'Navigate to ManageBookings',
              'See pending booking requests',
              'Approve one booking',
              'Cancel another'
            ],
            passCriteria: [
              'Pending bookings listed with amenity name, tenant, requested slot',
              'Approved booking appears as Confirmed in tenant\'s app',
              'Cancelled booking shows as Cancelled to tenant',
              'No double-booking allowed for same slot'
            ],
            failCriteria: [
              'Bookings list empty despite tenant submissions',
              'Approve/Cancel has no effect on tenant\'s view'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'p4',
    eyebrow: 'Part 4 of 8',
    title: 'Tenant Flow',
    description: 'Move-in, rent payment, maintenance requests, community access, and the full 5-stage move-out process.',
    count: 21,
    sections: [
      {
        header: 'Tenancy Setup',
        tests: [
          {
            id: 'D01',
            tid: 'D-01',
            name: 'New Tenant — Find Apartment Screen Shown After Role Selection',
            sub: 'New tenant is NOT taken to dashboard — must first be linked to a unit',
            preconditions: [
              'New account not yet linked to any unit'
            ],
            steps: [
              'Login with a fresh number → select "I\'m a Tenant" on Role Selection',
              'Observe the next screen'
            ],
            passCriteria: [
              'A "Find Apartment" or "Search for your apartment" screen is shown',
              'The Tenant Home dashboard is NOT shown yet',
              'User cannot bypass the search screen via back button'
            ]
          },
          {
            id: 'D02',
            tid: 'D-02',
            name: 'Existing Tenant With Active Tenancy — Lands on Home Dashboard',
            sub: 'Registered tenant with accepted lease goes straight to dashboard',
            preconditions: [
              'Account <code>+919000000002</code> (Ravi Kumar) has an active tenancy — unit A-101, Floor 1, Sunshine Towers, ₹18,000/month'
            ],
            steps: [
              'Login as <code>+919000000002</code> with OTP <code>000000</code>',
              'Observe the landing screen'
            ],
            passCriteria: [
              'Tenant Home dashboard shown (not role selection, not "Find Apartment")',
              'Property name and unit number visible on the screen',
              'Bottom tab bar visible with tenant-relevant tabs'
            ]
          },
          {
            id: 'D03',
            tid: 'D-03',
            name: 'Tenant Home — Lease Info and Rent Due Visible',
            sub: 'Tenant sees their unit, lease dates, and rent amount',
            steps: [
              'On Tenant Home, note the unit number (should match the unit they were assigned to)',
              'Note rent amount shown — must match what the owner set for that unit',
              'Note lease start and end dates if visible',
              'Pull to refresh — confirm no crash'
            ],
            passCriteria: [
              'Correct unit number shown (the one the owner assigned them to)',
              'Rent amount matches owner-set value',
              'Pull-to-refresh works without crash'
            ]
          }
        ]
      },
      {
        header: 'Payments & Maintenance',
        tests: [
          {
            id: 'D04',
            tid: 'D-04',
            name: 'Tenant Payment History Tab Loads',
            sub: "Rent payment records shown for this tenant's unit",
            steps: [
              'Navigate to the Payments or Billing tab',
              'Confirm rent records for the current tenancy are shown',
              'Tap a "Paid" entry — confirm receipt or details are shown'
            ],
            passCriteria: [
              'Payment records load without crash',
              'Paid entries show date paid and amount',
              'Tenant cannot see other tenants\' payments'
            ]
          },
          {
            id: 'D05',
            tid: 'D-05',
            name: 'Submit Maintenance Request',
            sub: "Tenant can raise a maintenance issue; it appears in admin's view",
            steps: [
              'Navigate to the Maintenance section',
              'Tap "New Request" or "Report Issue"',
              'Select category "Plumbing", describe as "Leaking tap in bathroom", and submit',
              'Confirm request appears in the tenant\'s request list with status "Open" or "Pending"',
              'On admin\'s device, navigate to maintenance requests — confirm the tenant\'s request is visible'
            ],
            passCriteria: [
              'Request submits without error',
              'Appears in tenant\'s list with "Open" status',
              'Visible to admin with tenant name and unit number'
            ],
            edges: [
              '<strong>Empty description:</strong> submit with blank description → blocked with validation error'
            ]
          }
        ]
      },
      {
        header: 'Visitor & Community',
        tests: [
          {
            id: 'D06',
            tid: 'D-06',
            name: 'Tenant Can Pre-Register a Visitor',
            sub: 'Tenant creates a visitor pass; guard can approve it',
            steps: [
              'Navigate to Visitor or Guests section',
              'Tap "Add Visitor" or "Pre-register"',
              'Enter visitor name "Sunil Joshi", mobile <code>9876543210</code>, visit date today, purpose "Personal visit"',
              'Submit — note the confirmation and any OTP or QR code generated'
            ],
            passCriteria: [
              'Visitor entry created with status "Pending" or "Scheduled"',
              'A pass code or QR is shown or sent (if the feature supports it)',
              'Guard can see this visitor entry (verify in Part 5/6 tests)'
            ]
          },
          {
            id: 'D07',
            tid: 'D-07',
            name: 'Tenant Community Tab — View and Post',
            sub: 'Tenant can read admin notices and create community posts',
            steps: [
              'Tap Community tab',
              'Confirm the admin notice from C-10 ("Maintenance Tomorrow") is visible',
              'Create a new post: "Anyone know a good plumber in the area?"',
              'Confirm post appears in feed attributed to the tenant\'s name'
            ],
            passCriteria: [
              'Admin notice visible in tenant\'s feed',
              'Tenant can post — post appears immediately',
              'Post attributed to correct user (not "anonymous")'
            ]
          },
          {
            id: 'D08',
            tid: 'D-08',
            name: 'Removed Tenancy — Tenant Redirected to Search',
            sub: 'When owner ends tenancy, tenant app shows apartment search on next session',
            steps: [
              'As owner (Part 2 account), remove the tenant from their unit (B-09)',
              'On the tenant\'s device, logout and log back in',
              'Observe the landing screen after login'
            ],
            passCriteria: [
              '"Find Apartment" screen shown — not the home dashboard',
              'No access to the previous unit\'s data'
            ]
          }
        ]
      },
      {
        header: 'Access Pending & Request Flow',
        tests: [
          {
            id: 'D09',
            tid: 'D-09',
            name: 'Access Pending Screen — Awaiting Admin Approval',
            sub: 'Tenant who submitted a request sees a holding screen',
            preconditions: [
              'Logged in as tenant who has submitted a unit access request but not yet been approved'
            ],
            steps: [
              'Log in with a tenant account that has <code>has_pending_request = true</code>',
              'Observe the screen that appears instead of Home'
            ],
            passCriteria: [
              'A clear holding/pending screen appears — NOT the main dashboard',
              'Screen shows a message like \'Your request is pending approval\'',
              'No tab bar is visible (gated state)',
              'User can log out from this screen'
            ],
            failCriteria: [
              'Main tenant dashboard shown despite pending status',
              'Blank screen with no message',
              'App crashes on login for pending-approval users'
            ]
          },
          {
            id: 'D10',
            tid: 'D-10',
            name: 'Tenant Request Tab — Submit and Track Maintenance Request',
            sub: 'Tenant creates and tracks a maintenance request',
            preconditions: [
              'Logged in as <code>+919000000002</code> Ravi Kumar — unit A-101, Sunshine Towers'
            ],
            steps: [
              'Tap the <strong>Request</strong> tab',
              'Tap <strong>New Request</strong>',
              'Select category (e.g., Plumbing), add description \'Water leaking from tap\', optionally attach a photo',
              'Submit',
              'Observe the request in the list'
            ],
            passCriteria: [
              'Request appears in the list with status \'Open\'',
              'Request details (category, description) are preserved',
              'Admin sees the request in AdminMaintenance (verify in C-14)'
            ],
            failCriteria: [
              'Request submitted but disappears from list immediately',
              'Status never changes from loading indicator',
              'Photo attachment crashes the form'
            ]
          }
        ]
      },
      {
        header: 'Family Members & Notifications',
        tests: [
          {
            id: 'D11',
            tid: 'D-11',
            name: 'Tenant Family Members — Add Family Member by Phone Invite',
            sub: 'Tenant invites a family member to join as an associated user',
            preconditions: [
              'Logged in as active tenant'
            ],
            steps: [
              'Navigate to TenantFamilyMembers (via More tab)',
              'Tap <strong>Add Member</strong>',
              'Enter family member\'s name, relationship, and phone number',
              'Submit the invite'
            ],
            passCriteria: [
              'Invite sent (family member receives OTP or link if applicable)',
              'Family member appears in list with status \'Pending\'',
              'After family member logs in, status changes to \'Active\'',
              'Admin can see family member in FamilyMembersAdmin'
            ],
            failCriteria: [
              'Invite form crashes on submit',
              'Duplicate invite allowed for same number',
              'Family member not visible to admin after acceptance'
            ]
          },
          {
            id: 'D12',
            tid: 'D-12',
            name: 'Tenant Notifications Screen — View All Push Notifications',
            sub: 'Tenant views history of all received notifications',
            preconditions: [
              'Logged in as active tenant',
              'At least one notification has been sent to this tenant'
            ],
            steps: [
              'Navigate to TenantNotifications (via More tab or bell icon)',
              'Browse notification list'
            ],
            passCriteria: [
              'Notifications listed newest first with title and body',
              'Unread notifications are visually distinct',
              'Tapping a notification deep-links to the relevant screen (e.g., payment notification → Payments tab)'
            ],
            failCriteria: [
              'Notification list empty despite notifications sent',
              'Tapping notification does nothing',
              'All notifications appear as unread even after viewing'
            ]
          },
          {
            id: 'D13',
            tid: 'D-13',
            name: 'Tenant More Screen — Profile Edit, Settings, and Logout',
            sub: 'Tenant accesses account management from More tab',
            preconditions: [
              'Logged in as active tenant'
            ],
            steps: [
              'Tap the <strong>More</strong> tab',
              'Verify profile name and phone are displayed',
              'Tap <strong>Edit Profile</strong> and change name',
              'Save and confirm name updates',
              'Locate and tap <strong>Logout</strong>'
            ],
            passCriteria: [
              'Profile shows correct name and phone number',
              'Name update persists after navigating away',
              'Logout clears session and returns to login screen',
              'After logout, pressing back does NOT return to authenticated screens'
            ],
            failCriteria: [
              'Profile shows empty name',
              'Logout action has no confirmation dialog but also no undo',
              'After logout, back button re-enters the app authenticated'
            ]
          }
        ]
      },
      {
        header: 'Billing Disputes',
        tests: [
          {
            id: 'D14',
            tid: 'D-14',
            name: 'Raise a Bill Dispute — Tenant Contests a Charge',
            sub: 'Tenant disputes a bill amount they believe is incorrect',
            preconditions: [
              'Logged in as active tenant',
              'At least one bill has been generated for this tenant'
            ],
            steps: [
              'Navigate to Payments tab',
              'Select a bill',
              'Tap <strong>Dispute Bill</strong> or <strong>Raise Dispute</strong>',
              'Enter reason: \'Amount differs from lease agreement\'',
              'Submit'
            ],
            passCriteria: [
              'Dispute submitted with status \'Open\'',
              'Admin sees the dispute in BillDisputesAdmin (C-18)',
              'Bill row in tenant\'s Payments shows \'Disputed\' badge'
            ],
            failCriteria: [
              'Dispute button missing on bill detail',
              'Dispute submitted but no confirmation shown',
              'Admin cannot see the submitted dispute'
            ]
          },
          {
            id: 'D15',
            tid: 'D-15',
            name: 'My Disputes — View Own Dispute Status and Resolution',
            sub: 'Tenant tracks the status of their submitted disputes',
            preconditions: [
              'Logged in as active tenant',
              'At least one dispute has been submitted (D-14)'
            ],
            steps: [
              'Navigate to MyDisputes screen (via Payments or More tab)',
              'Open the dispute'
            ],
            passCriteria: [
              'Dispute shows current status (Open / In Progress / Resolved)',
              'Admin\'s resolution note visible once resolved',
              'Adjusted bill amount reflected if admin applied adjustment'
            ],
            failCriteria: [
              'Dispute status never updates from \'Open\'',
              'Admin note not visible to tenant',
              'Adjusted amount not reflected'
            ]
          }
        ]
      },
      {
        header: 'Visitor Pre-Registration',
        tests: [
          {
            id: 'D16',
            tid: 'D-16',
            name: 'Visitor Approval Hub — Select Visitor Type',
            sub: 'Tenant sees all visitor type options',
            preconditions: [
              'Logged in as active tenant'
            ],
            steps: [
              'Navigate to Visitors (via VisitorApprovalHub entry point)',
              'Observe the hub screen'
            ],
            passCriteria: [
              'Hub shows cards/options for: Person, Delivery, Cab/Taxi, Service Provider, Group Invite',
              'Tapping each option opens the correct registration form',
              'No options are missing or duplicated'
            ],
            failCriteria: [
              'Hub shows fewer than 5 options',
              'Tapping an option shows wrong form',
              'App crashes on any option tap'
            ]
          },
          {
            id: 'D17',
            tid: 'D-17',
            name: 'Visitor Delivery — Pre-Register a Delivery',
            sub: 'Tenant pre-registers an incoming delivery person',
            preconditions: [
              'Logged in as active tenant'
            ],
            steps: [
              'From VisitorApprovalHub, tap <strong>Delivery</strong>',
              'Enter delivery person name and company (e.g., \'Swiggy\')',
              'Set expected time window',
              'Submit'
            ],
            passCriteria: [
              'Delivery visitor pre-registered with type \'Delivery\'',
              'Guard sees this visitor in their gate screen with delivery badge',
              'Visitor pass generated/accessible to share'
            ],
            failCriteria: [
              'Delivery type not distinguished from regular visitor on guard screen',
              'Time window not saved'
            ]
          },
          {
            id: 'D18',
            tid: 'D-18',
            name: 'Visitor Cab — Pre-Register a Cab or Taxi',
            sub: 'Tenant pre-registers a cab pick-up or drop-off',
            preconditions: [
              'Logged in as active tenant'
            ],
            steps: [
              'From hub, tap <strong>Cab</strong>',
              'Enter cab driver name, vehicle number',
              'Submit'
            ],
            passCriteria: [
              'Cab visitor pre-registered with type \'Cab\' and vehicle number visible',
              'Guard can see vehicle number on their gate screen'
            ],
            failCriteria: [
              'Vehicle number not shown to guard',
              'Cab type not differentiated'
            ]
          },
          {
            id: 'D19',
            tid: 'D-19',
            name: 'Visitor Service — Pre-Register a Service Provider',
            sub: 'Tenant pre-registers a plumber, electrician, or similar',
            preconditions: [
              'Logged in as active tenant'
            ],
            steps: [
              'From hub, tap <strong>Service Provider</strong>',
              'Enter provider name, service type (e.g., \'Plumber\'), and expected time',
              'Submit'
            ],
            passCriteria: [
              'Service visitor pre-registered with type \'Service\'',
              'Service type label visible to guard',
              'Guard can verify and approve'
            ],
            failCriteria: [
              'Service type missing from guard\'s view',
              'Form missing service type field'
            ]
          },
          {
            id: 'D20',
            tid: 'D-20',
            name: 'Visitor Group Invite — Pre-Register Multiple Visitors',
            sub: 'Tenant creates a group invite for a gathering',
            preconditions: [
              'Logged in as active tenant'
            ],
            steps: [
              'From hub, tap <strong>Group Invite</strong>',
              'Enter event name (e.g., \'Birthday Party\'), expected number of guests',
              'Set valid time window',
              'Submit'
            ],
            passCriteria: [
              'Group invite created with a shareable pass/code',
              'Guard can approve individual guests under this group pass',
              'Number of approved guests tracked against expected count'
            ],
            failCriteria: [
              'Group pass not shareable',
              'Guard can\'t see group context on visitor arrival'
            ]
          },
          {
            id: 'D21',
            tid: 'D-21',
            name: 'Visitor Pass — View and Share a Pre-Registration Pass',
            sub: 'Tenant shares a visitor pass so the visitor can show it at gate',
            preconditions: [
              'Logged in as active tenant',
              'At least one visitor pre-registration exists'
            ],
            steps: [
              'Navigate to VisitorPass (from active pre-registration)',
              'View the pass',
              'Use the share button to share the pass link/QR'
            ],
            passCriteria: [
              'Pass shows visitor name, valid time, and a QR code or reference code',
              'Share button opens system share sheet',
              'Guard can scan/look up the pass code to approve entry'
            ],
            failCriteria: [
              'Pass shows empty or wrong visitor info',
              'Share button does nothing',
              'Guard cannot find the pass'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'p5',
    eyebrow: 'Part 5 of 8',
    title: 'Guard Flow',
    description: 'Visitor log, vehicle log, gate operations, and guard-specific screens.',
    count: 12,
    sections: [
      {
        header: 'Login & Dashboard',
        tests: [
          {
            id: 'E01',
            tid: 'E-01',
            name: 'Guard Login — Lands on Guard Dashboard',
            sub: 'Guard account routes to guard-specific screen, not any owner/tenant screen',
            preconditions: [
              'Account <code>+919000000007</code> has been appointed as guard (C-08 passed)'
            ],
            steps: [
              'Login as <code>+919000000007</code> with OTP <code>000000</code>',
              'Note the landing screen — confirm it is not owner onboarding, tenant flow, or role selection',
              'Confirm the assigned property name is shown'
            ],
            passCriteria: [
              'Guard Dashboard shown with assigned property name',
              'Visitor-related actions visible (check-in, pending visitors)',
              'No owner/tenant dashboard elements'
            ]
          },
          {
            id: 'E02',
            tid: 'E-02',
            name: 'Pending Visitor List Shown on Dashboard',
            sub: "Pre-registered visitor from tenant (D-06) appears in guard's pending list",
            preconditions: [
              'D-06 completed — visitor "Sunil Joshi" pre-registered by tenant'
            ],
            steps: [
              'On the Guard Dashboard, look at the pending/upcoming visitors list',
              'Confirm "Sunil Joshi" appears with the host unit number'
            ],
            passCriteria: [
              '"Sunil Joshi" is visible in the guard\'s pending list',
              'Host unit and visit date shown correctly'
            ]
          }
        ]
      },
      {
        header: 'Visitor Check-In',
        tests: [
          {
            id: 'E03',
            tid: 'E-03',
            name: 'Approve Pre-Registered Visitor',
            sub: 'Guard approves "Sunil Joshi"; status changes to Approved',
            steps: [
              'Tap "Sunil Joshi" in the pending list',
              'Tap "Approve" or "Check In"',
              'Confirm the visitor\'s status changes to "Approved" or "Checked In"',
              'Confirm the tenant receives a notification (check on tenant\'s device)'
            ],
            passCriteria: [
              'Status changes to "Approved" or "Checked In" immediately',
              'Entry moves from "Pending" to the appropriate section',
              'Tenant notification received (if push notifications are enabled)'
            ]
          },
          {
            id: 'E04',
            tid: 'E-04',
            name: 'Deny a Visitor',
            sub: 'Guard denies a visitor; status changes to Denied, host notified',
            steps: [
              'Pre-register a new visitor from the tenant\'s device (name "Test Deny Visitor")',
              'On guard\'s device, tap the new visitor and tap "Deny"',
              'Confirm status changes to "Denied"'
            ],
            passCriteria: [
              'Visitor status changes to "Denied"',
              'Visitor does not appear in the "Approved" or "Inside" list'
            ]
          },
          {
            id: 'E05',
            tid: 'E-05',
            name: 'Walk-In Visitor Entry',
            sub: 'Guard logs an unannounced visitor manually',
            steps: [
              'On Guard Dashboard, tap "Add Visitor" or "Walk-in" button',
              'Enter: name "Sita Sharma", mobile <code>9988776655</code>, host unit "101", purpose "Delivery"',
              'Submit — confirm entry appears in today\'s visitor log with status "Inside"'
            ],
            passCriteria: [
              'Walk-in entry saved without error',
              'Appears in visitor log with correct details',
              'Check-in time is auto-filled to current time'
            ]
          },
          {
            id: 'E06',
            tid: 'E-06',
            name: 'Mark Visitor as Checked Out',
            sub: 'Guard records departure; visitor log shows exit time',
            steps: [
              'Find "Sita Sharma" in the "Inside" visitor list (from E-05)',
              'Tap "Check Out" or "Mark Exit"',
              'Confirm the record shows exit time and moves to the "Exited" or historical log'
            ],
            passCriteria: [
              'Exit time recorded (current time)',
              'Visitor no longer in "Inside" list',
              'Appears in historical log with both check-in and check-out times'
            ]
          }
        ]
      },
      {
        header: 'Guard Inside Tab & Alerts',
        tests: [
          {
            id: 'E07',
            tid: 'E-07',
            name: 'Guard Inside Tab — View People Currently Inside',
            sub: 'Guard sees a live list of all visitors currently inside the property',
            preconditions: [
              'Logged in as guard',
              'At least one visitor has been checked in and not yet checked out'
            ],
            steps: [
              'Tap the <strong>Inside</strong> tab',
              'Observe the list of people inside'
            ],
            passCriteria: [
              'Inside tab shows visitor names, unit, check-in time, and visitor type',
              'Tenant residents and active family members may also be listed',
              'List updates when new check-in or check-out happens'
            ],
            failCriteria: [
              'Inside list shows 0 people despite checked-in visitors',
              'List doesn\'t update after a new check-in without manual refresh'
            ]
          },
          {
            id: 'E08',
            tid: 'E-08',
            name: 'Guard Alerts Tab — View SOS and Emergency Alerts',
            sub: 'Guard receives and acknowledges emergency SOS alerts',
            preconditions: [
              'Logged in as guard',
              'An SOS alert has been triggered (by tenant from home screen or community)'
            ],
            steps: [
              'Tap the <strong>Alerts</strong> tab',
              'Observe the SOS alert',
              'Tap the alert to view details and sender location/unit',
              'Mark as Acknowledged'
            ],
            passCriteria: [
              'Alert appears in Alerts tab with sender name, unit, and time',
              'Alert detail shows full message and unit/location info',
              'Acknowledged alerts are visually distinguished from unacknowledged',
              'Guard profile badge or tab badge shows unread alert count'
            ],
            failCriteria: [
              'Alert tab is empty despite active SOS',
              'Acknowledging alert has no visible effect',
              'Alert shows wrong unit or sender'
            ]
          },
          {
            id: 'E09',
            tid: 'E-09',
            name: 'Guard Vehicle Log — Record Vehicle Entry and Exit',
            sub: 'Guard logs vehicles entering or leaving the property',
            preconditions: [
              'Logged in as guard'
            ],
            steps: [
              'Navigate to GuardVehicleLog (from profile or main nav)',
              'Tap <strong>Log Entry</strong>',
              'Enter vehicle number, type (Car/Bike/Truck), and visitor purpose',
              'Save',
              'Later tap <strong>Log Exit</strong> for the same vehicle'
            ],
            passCriteria: [
              'Vehicle entry logged with number, type, and timestamp',
              'Exit timestamp recorded on Log Exit',
              'Log shows entry/exit pairs correctly',
              'Admin can see vehicle log in admin panel'
            ],
            failCriteria: [
              'Vehicle number not saved correctly',
              'Exit logged without a corresponding entry',
              'Log shows all vehicles from all properties'
            ]
          },
          {
            id: 'E10',
            tid: 'E-10',
            name: 'Guard Profile Screen — View Assignment and Contact Info',
            sub: 'Guard can view their assigned property and profile details',
            preconditions: [
              'Logged in as guard'
            ],
            steps: [
              'Tap the <strong>Profile</strong> tab',
              'Observe displayed information'
            ],
            passCriteria: [
              'Profile shows guard name, phone, and assigned property name',
              'Shift information or working hours shown (if configured)',
              'Logout button present and functional'
            ],
            failCriteria: [
              'Profile shows wrong property',
              'Logout button missing',
              'Profile shows another guard\'s details'
            ]
          }
        ]
      },
      {
        header: 'Gate Screen — Search & Checkout Flows',
        tests: [
          {
            id: 'E11',
            tid: 'E-11',
            name: 'Gate Screen — Search Pre-Registered Visitors',
            sub: 'Guard searches for a pre-registered visitor by name or code',
            preconditions: [
              'Logged in as guard',
              'At least one pre-registered visitor exists'
            ],
            steps: [
              'On the Gate tab, use the search bar',
              'Type the visitor\'s name or pass code',
              'Observe search results'
            ],
            passCriteria: [
              'Search returns the correct pre-registered visitor',
              'Visitor row shows name, type, unit, and expected arrival time',
              'No results shown for non-existent names'
            ],
            failCriteria: [
              'Search returns all visitors regardless of search term',
              'Search clears the list entirely'
            ]
          },
          {
            id: 'E12',
            tid: 'E-12',
            name: 'Mark Visitor Checkout from Inside Tab',
            sub: 'Guard checks out a visitor from the Inside tab',
            preconditions: [
              'Logged in as guard',
              'At least one visitor is currently inside (checked in)'
            ],
            steps: [
              'Tap the <strong>Inside</strong> tab',
              'Find the visitor to check out',
              'Tap <strong>Check Out</strong>',
              'Confirm'
            ],
            passCriteria: [
              'Visitor removed from Inside tab list',
              'Visitor record in log shows check-out timestamp',
              'Tenant receives a checkout notification'
            ],
            failCriteria: [
              'Visitor remains on Inside list after checkout',
              'Checkout timestamp not recorded',
              'Confirmation dialog not shown before action'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'p6',
    eyebrow: 'Part 6 of 8',
    title: 'Visitor Management',
    description: 'Pre-approval flows, entry logging, delivery tracking, cab and service approval.',
    count: 10,
    sections: [
      {
        header: 'Visitor Lifecycle — End to End',
        tests: [
          {
            id: 'F01',
            tid: 'F-01',
            name: 'Pre-Register → Guard Approves → Tenant Notified',
            sub: 'Complete happy-path visitor flow across all three roles',
            steps: [
              'Tenant: pre-register visitor "Test Visitor" for unit 101, today\'s date',
              'Guard: confirm visitor appears in pending list with correct unit (101)',
              'Guard: tap Approve',
              'Tenant: confirm push notification received (if push enabled) or check visitor status — must show "Approved"',
              'Admin: confirm visitor appears in property-level visitor log'
            ],
            passCriteria: [
              'Guard sees visitor in pending list',
              'After guard approves: status = "Approved" for all three roles',
              'Tenant notification received or status visible in app',
              'Admin\'s visitor log shows the entry'
            ]
          },
          {
            id: 'F02',
            tid: 'F-02',
            name: 'Visitor From a Different Property Cannot Check In Here',
            sub: 'Guard cannot approve a visitor registered for a different property',
            steps: [
              'If there is a second property in the system, pre-register a visitor from a tenant of that property',
              'On the first property\'s guard account, look for the visitor in the pending list'
            ],
            passCriteria: [
              'Visitor from a different property does NOT appear in the first property guard\'s pending list'
            ]
          },
          {
            id: 'F03',
            tid: 'F-03',
            name: 'Visitor Log — Searchable and Filterable',
            sub: 'Guard and admin can filter visitors by date and status',
            steps: [
              'On the guard\'s visitor log, look for a search or filter option',
              'Search for "Sunil Joshi" — confirm only that visitor\'s entries appear',
              'Filter by status "Approved" — confirm only approved entries are shown',
              'Filter by today\'s date — confirm only today\'s entries are shown'
            ],
            passCriteria: [
              'Search returns correct results',
              'Status filter works correctly',
              'Date filter shows only the selected day\'s entries',
              'Clearing filter restores all entries'
            ]
          }
        ]
      },
      {
        header: 'Visitor Registration — Extended Types',
        tests: [
          {
            id: 'F04',
            tid: 'F-04',
            name: 'Group Invite — Guard Approves Individual Group Members',
            sub: 'Guard checks in guests arriving under a group pass',
            preconditions: [
              'Group invite pre-registered by tenant (D-20)',
              'Guard logged in'
            ],
            steps: [
              'Guard sees a visitor claiming to be under group invite',
              'Search for the group pass code on gate screen',
              'Approve the individual guest under the group pass'
            ],
            passCriteria: [
              'Group pass found by code search on gate screen',
              'Individual guest check-in recorded under group pass',
              'Approved count increments toward expected total',
              'Tenant notified per guest arrival'
            ],
            failCriteria: [
              'Group pass not findable on gate screen',
              'Individual check-ins not linked to the group'
            ]
          },
          {
            id: 'F05',
            tid: 'F-05',
            name: 'From Contacts — Pre-Register from Phone Address Book',
            sub: 'Tenant pre-registers a visitor by selecting from device contacts',
            preconditions: [
              'Logged in as active tenant',
              'Device contacts permission granted'
            ],
            steps: [
              'From VisitorApprovalHub tap <strong>From Contacts</strong> (or equivalent)',
              'Allow contacts permission if prompted',
              'Select a contact from the device address book',
              'Confirm the pre-registration'
            ],
            passCriteria: [
              'Contact\'s name and phone are pre-filled in the registration form',
              'Registration completes with contact\'s details',
              'Guard sees correct visitor name on gate screen'
            ],
            failCriteria: [
              'Contacts permission dialog not shown (silently denied)',
              'Contact name not carried into form',
              'Form shows blank after contact selection'
            ]
          },
          {
            id: 'F06',
            tid: 'F-06',
            name: 'Visitor Pass — QR / Code Shown to Guard for Manual Entry',
            sub: 'Guard can look up visitor by the pass code even without camera scan',
            preconditions: [
              'Visitor pass created by tenant (D-21)',
              'Guard logged in'
            ],
            steps: [
              'Tenant shares the pass code with the guard (via message)',
              'Guard types the code in the search bar on Gate screen',
              'Approve based on the code'
            ],
            passCriteria: [
              'Pass code lookup returns the correct pre-registered visitor',
              'Guard can approve/deny from the search result',
              'Approval records the pass code as the entry method'
            ],
            failCriteria: [
              'Code not searchable on guard screen',
              'Code lookup returns wrong visitor'
            ]
          }
        ]
      },
      {
        header: 'Visitor Log & Cross-Property Checks',
        tests: [
          {
            id: 'F07',
            tid: 'F-07',
            name: 'Visitor Log — Date Filter and Export',
            sub: 'Admin or guard can filter visitor log by date range',
            preconditions: [
              'Logged in as admin or guard',
              'Visitors logged on multiple dates'
            ],
            steps: [
              'Open visitor log',
              'Apply a date filter (e.g., last 7 days)',
              'Verify results match the filter'
            ],
            passCriteria: [
              'Log filtered to show only visitors in the selected date range',
              'Visitor count reflects filter (not all-time total)',
              'Clearing filter restores full list'
            ],
            failCriteria: [
              'Date filter has no effect',
              'Filter crashes',
              'Total count doesn\'t update with filter'
            ]
          },
          {
            id: 'F08',
            tid: 'F-08',
            name: 'Pre-Registration Notification to Tenant on Approval',
            sub: 'Tenant receives a push notification when their pre-registered visitor is approved',
            preconditions: [
              'Active tenant with push notifications enabled',
              'Guard approves a pre-registered visitor'
            ],
            steps: [
              'Tenant pre-registers a visitor (D-16)',
              'Guard approves the visitor entry on the gate screen',
              'Observe the tenant\'s device for a push notification'
            ],
            passCriteria: [
              'Tenant receives push notification within 60 seconds of guard approval',
              'Notification text includes visitor name and approval status',
              'Tapping notification navigates to Visitor History/Log'
            ],
            failCriteria: [
              'No notification sent after guard approval',
              'Notification arrives but tapping it opens a wrong screen'
            ]
          },
          {
            id: 'F09',
            tid: 'F-09',
            name: 'Pre-Registered Visitor — Entry After Expiry Window Rejected',
            sub: 'Guard cannot approve a pre-registration past its valid time window',
            preconditions: [
              'A pre-registered visitor exists with an expired time window (e.g., valid until 2 hours ago)'
            ],
            steps: [
              'Guard searches for the expired pre-registration on Gate screen',
              'Attempt to approve the entry'
            ],
            passCriteria: [
              'Guard screen shows visitor as \'Expired\' or the approval button is disabled',
              'Attempting to approve shows error: \'Visitor pass has expired\'',
              'Guard cannot override and approve an expired pass'
            ],
            failCriteria: [
              'Expired pass approved without warning',
              'No visual indication of expiry on guard screen'
            ]
          },
          {
            id: 'F10',
            tid: 'F-10',
            name: 'Walk-In — Entry Without Pre-Registration',
            sub: 'Guard logs a walk-in visitor not pre-registered',
            preconditions: [
              'Logged in as guard'
            ],
            steps: [
              'Tap <strong>Walk-In Entry</strong> (or equivalent) on Gate screen',
              'Enter visitor name, purpose, and unit they\'re visiting',
              'Call the tenant to confirm (optional in UI)',
              'Approve and record entry'
            ],
            passCriteria: [
              'Walk-in logged with name, purpose, unit, and timestamp',
              'Visitor appears in Inside tab after entry',
              'Walk-in visitors distinguished from pre-registered in log'
            ],
            failCriteria: [
              'Walk-in form missing purpose or unit field',
              'Walk-in not distinguished from pre-registered in log'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'p7',
    eyebrow: 'Part 7 of 8',
    title: 'Community Module',
    description: 'Announcements, polls, events, and forum — all four community sub-screens.',
    count: 15,
    sections: [
      {
        header: 'Feed & Notices',
        tests: [
          {
            id: 'G01',
            tid: 'G-01',
            name: 'Community Feed Loads for All Roles',
            sub: 'Feed visible to admin, owner, and tenant with no crash',
            steps: [
              'Login as property admin → tap Community tab → confirm feed loads (not blank or crashed)',
              'Login as owner → tap Community tab → confirm feed loads',
              'Login as tenant → tap Community tab → confirm feed loads',
              'Pull to refresh on each — confirm no errors'
            ],
            passCriteria: [
              'Community tab loads for all three roles',
              'Content from the same property is visible to all three',
              'No infinite spinner or crash on any role'
            ]
          },
          {
            id: 'G02',
            tid: 'G-02',
            name: 'Admin Notice Visible to Tenant Within 60 Seconds',
            sub: 'Real-time or near-real-time notice propagation from admin to tenant feed',
            steps: [
              'Admin posts a notice: "Water supply off at 2PM" (timestamp: now)',
              'On tenant\'s device, pull-to-refresh on Community tab',
              'Wait up to 60 seconds — check again with pull-to-refresh'
            ],
            passCriteria: [
              'Tenant sees "Water supply off at 2PM" notice within 60 seconds of posting',
              'Notice attributed to the admin (not anonymous)',
              'Posting timestamp shown correctly'
            ]
          },
          {
            id: 'G03',
            tid: 'G-03',
            name: 'Tenant Can Comment on a Post; Admin Sees Comment',
            sub: 'Comment propagation tested cross-role',
            steps: [
              'Tenant: tap the admin notice → tap "Comment" → type "Noted, thanks" and post',
              'Admin: refresh the community feed → tap the notice → confirm tenant\'s comment is visible'
            ],
            passCriteria: [
              'Comment posts without error',
              'Admin sees comment with tenant\'s name and "Noted, thanks" text',
              'Comment timestamp is accurate'
            ]
          },
          {
            id: 'G04',
            tid: 'G-04',
            name: 'Admin Can Delete Any Post; Tenant Can Only Delete Own',
            sub: 'Role-based delete permissions enforced in the UI',
            steps: [
              'Tenant: long-press their own post (from D-07) → confirm "Delete" option is available → cancel',
              'Tenant: long-press the admin\'s notice → confirm "Delete" option is NOT available',
              'Admin: long-press the tenant\'s post → confirm "Delete" option IS available → delete it → confirm post disappears'
            ],
            passCriteria: [
              'Tenant has Delete on own posts only',
              'Admin has Delete on any post',
              'Deleted post disappears from both feeds after deletion'
            ]
          },
          {
            id: 'G05',
            tid: 'G-05',
            name: 'Community Sub-Screens All Load (4 Tabs)',
            sub: 'Announcements, Discussion, Events, and Polls sub-tabs all render',
            steps: [
              'On the Community tab, locate the sub-screen tabs at the top (swipeable or tabbed)',
              'Tap each sub-screen in sequence and confirm each loads (no crash, no blank white screen)',
              'Swipe between tabs to confirm swiping also works'
            ],
            passCriteria: [
              'All 4 sub-screens load without crash',
              'Swipe gesture between tabs works correctly',
              'No infinite spinner on any sub-screen'
            ]
          }
        ]
      },
      {
        header: 'Amenity Booking',
        tests: [
          {
            id: 'G06',
            tid: 'G-06',
            name: 'CommunityAmenities — Browse and Book an Amenity',
            sub: 'Tenant browses available amenities and submits a booking',
            preconditions: [
              'Logged in as active tenant',
              'Property has at least one amenity configured (e.g., Gym, Clubhouse)'
            ],
            steps: [
              'Navigate to CommunityAmenities (Community tab sub-screen)',
              'Tap on an amenity (e.g., Gym)',
              'Select a time slot that is available',
              'Submit booking'
            ],
            passCriteria: [
              'Amenity detail shows name, description, capacity, and available slots',
              'Selected slot shows as \'Pending Approval\' or \'Confirmed\' after submission',
              'Admin sees the booking in ManageBookings (C-33)',
              'Tenant gets a confirmation notification'
            ],
            failCriteria: [
              'Slot selection crashes',
              'Booking submitted but not visible to admin',
              'Same slot bookable by two tenants simultaneously'
            ]
          },
          {
            id: 'G07',
            tid: 'G-07',
            name: 'Amenity Booking — Admin Approval Reflected in Tenant App',
            sub: 'Tenant sees Confirmed status after admin approves their booking',
            preconditions: [
              'Admin approved a booking in ManageBookings (C-33)',
              'Tenant who submitted booking is logged in'
            ],
            steps: [
              'Admin approves the booking (C-33)',
              'On tenant device, navigate to CommunityAmenities',
              'Check the booking status'
            ],
            passCriteria: [
              'Booking status updates from \'Pending\' to \'Confirmed\' within 30 seconds (or on next screen load)',
              'Confirmed booking shows slot time clearly',
              'Tenant receives a push notification of approval'
            ],
            failCriteria: [
              'Status remains \'Pending\' despite admin approval',
              'Tenant must logout/login to see update',
              'No notification sent'
            ]
          },
          {
            id: 'G08',
            tid: 'G-08',
            name: 'Cancel Amenity Booking — Slot Released on Cancellation',
            sub: 'Tenant cancels a confirmed booking and slot becomes available',
            preconditions: [
              'Active tenant with a Confirmed amenity booking'
            ],
            steps: [
              'Navigate to CommunityAmenities → My Bookings',
              'Tap <strong>Cancel</strong> on a confirmed booking',
              'Confirm cancellation'
            ],
            passCriteria: [
              'Booking status changes to \'Cancelled\'',
              'The slot becomes available again for other tenants to book',
              'Cancellation confirmation dialog shown before action'
            ],
            failCriteria: [
              'Cancellation has no confirmation dialog',
              'Slot remains blocked after cancellation',
              'Booking not marked as cancelled'
            ]
          }
        ]
      },
      {
        header: 'Polls',
        tests: [
          {
            id: 'G09',
            tid: 'G-09',
            name: 'CommunityPolls — Tenant Votes in a Poll',
            sub: 'Tenant participates in an active community poll',
            preconditions: [
              'Logged in as active tenant',
              'An active poll has been created by admin (C-27)'
            ],
            steps: [
              'Navigate to CommunityPolls',
              'Open the active poll',
              'Select an option and submit vote'
            ],
            passCriteria: [
              'Poll question and all options displayed',
              'Vote submitted — results update to show tenant\'s vote counted',
              'Poll shows total vote count after voting',
              'Voting again (changing vote) should be prevented OR allowed depending on configuration'
            ],
            failCriteria: [
              'Poll options not shown',
              'Vote submitted but count doesn\'t increment',
              'Tenant can vote multiple times without restriction'
            ]
          },
          {
            id: 'G10',
            tid: 'G-10',
            name: 'Poll Results — View Live Results After Voting',
            sub: 'Tenant and admin see real-time poll results',
            preconditions: [
              'Logged in as admin or tenant',
              'A poll with at least one vote exists'
            ],
            steps: [
              'Navigate to the poll results view',
              'Observe vote counts and percentages'
            ],
            passCriteria: [
              'Each option shows vote count and percentage bar',
              'Total vote count shown',
              'Results match actual votes cast'
            ],
            failCriteria: [
              'Percentages don\'t add to 100%',
              'Results show before poll closes (if voting should be blind)',
              'Results cached and not updated with new votes'
            ]
          }
        ]
      },
      {
        header: 'Notice Board & Support Requests',
        tests: [
          {
            id: 'G11',
            tid: 'G-11',
            name: 'Notice Board — View Pinned Announcements',
            sub: 'All roles see the notice board with active announcements',
            preconditions: [
              'An announcement has been pinned by admin'
            ],
            steps: [
              'Navigate to CommunityNoticeBoard (Notice Board sub-screen)',
              'Browse pinned notices'
            ],
            passCriteria: [
              'Pinned announcements shown with title, body, and posted date',
              'Author name and timestamp visible',
              'Tapping an announcement expands full content'
            ],
            failCriteria: [
              'Notice board empty despite published announcements',
              'Unpinned old announcements still shown as pinned'
            ]
          },
          {
            id: 'G12',
            tid: 'G-12',
            name: 'Notice Board — Admin Pins and Unpins Announcement',
            sub: 'Admin controls which announcements appear as pinned notices',
            preconditions: [
              'Logged in as property_admin',
              'An announcement has been created (C-32)'
            ],
            steps: [
              'Navigate to announcements management',
              'Pin an announcement to the notice board',
              'Verify it appears in CommunityNoticeBoard',
              'Unpin it and verify it\'s removed from notice board'
            ],
            passCriteria: [
              'Pinned announcement appears in notice board for all roles',
              'Unpinned announcement disappears from notice board',
              'Action is immediate (no app restart needed)'
            ],
            failCriteria: [
              'Pinned announcement not visible to tenants',
              'Unpin doesn\'t remove it from notice board'
            ]
          },
          {
            id: 'G13',
            tid: 'G-13',
            name: 'Community Support Requests — Tenant Raises Maintenance via Community',
            sub: 'Tenant submits a support/maintenance request through the community screen',
            preconditions: [
              'Logged in as active tenant'
            ],
            steps: [
              'Navigate to SupportRequestsScreen (Community tab sub-screen)',
              'Tap <strong>New Request</strong>',
              'Select category, add description, and submit'
            ],
            passCriteria: [
              'Request saved and shown in list with status \'Open\'',
              'Admin can view it in AdminMaintenance (or community support console)',
              'Request linked to the tenant\'s unit'
            ],
            failCriteria: [
              'Request submitted but no confirmation shown',
              'Admin cannot see the submitted request',
              'Request not linked to correct unit'
            ]
          },
          {
            id: 'G14',
            tid: 'G-14',
            name: 'Community Support Request — Track Status Updates',
            sub: 'Tenant follows progress of their community support request',
            preconditions: [
              'Active tenant with a submitted support request (G-13)'
            ],
            steps: [
              'Open the support request from SupportRequestsScreen',
              'Admin updates status to \'In Progress\' then \'Resolved\'',
              'Verify status update on tenant\'s screen'
            ],
            passCriteria: [
              'Status progression from Open → In Progress → Resolved visible to tenant',
              'Admin\'s comment/note visible after update',
              'Resolution notification sent to tenant'
            ],
            failCriteria: [
              'Status stuck at Open',
              'Admin comment not visible to tenant'
            ]
          },
          {
            id: 'G15',
            tid: 'G-15',
            name: 'Community — All 4 Sub-Screens Load for Admin Role',
            sub: 'Property admin has access to all community sub-screens',
            preconditions: [
              'Logged in as property_admin'
            ],
            steps: [
              'Navigate to Community tab',
              'Tap each sub-screen: Amenities, Polls, Notice Board, Support Requests'
            ],
            passCriteria: [
              'All 4 sub-screens load without error for admin role',
              'Admin sees admin-level controls (create/pin/manage) on each screen',
              'No screen shows \'Access Denied\' for admin'
            ],
            failCriteria: [
              'Any sub-screen throws an error or is blank for admin',
              'Admin sees tenant-only read view instead of management controls'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'p8',
    eyebrow: 'Part 8 of 8',
    title: 'Web Admin Portal',
    description: 'Super admin controls, property management, tenant records, billing, and reports.',
    count: 40,
    sections: [
      {
        header: 'Login & Dashboard',
        tests: [
          {
            id: 'H01',
            tid: 'H-01',
            name: 'Super Admin Login — OTP Flow on Web',
            sub: 'Web portal login with phone + OTP works for super_admin',
            steps: [
              'Open the web admin portal URL in a browser',
              'Enter phone <code>9000000009</code> and click Send OTP',
              'Enter <code>000000</code> and click Verify',
              'Confirm redirect to the super admin dashboard'
            ],
            passCriteria: [
              'OTP flow completes without error',
              'Super admin dashboard loads',
              'Dashboard shows global stats (total properties, total users, etc.)'
            ]
          },
          {
            id: 'H02',
            tid: 'H-02',
            name: 'Non-Super-Admin Cannot Access Web Portal',
            sub: 'Owner and tenant logins are rejected on the web admin portal',
            steps: [
              'On the web portal login, enter phone <code>9000000002</code> (Ravi Kumar, tenant), OTP <code>000000</code> — note: tenants have no web portal access; expect an access-denied screen',
              'Note the error or redirect',
              'Repeat with owner account phone — confirm also blocked'
            ],
            passCriteria: [
              'Non-super-admin accounts receive an "Access denied" or "Unauthorized" error',
              'They are NOT redirected to the admin dashboard',
              'They cannot access any protected admin route by URL manipulation'
            ]
          }
        ]
      },
      {
        header: 'Property Management',
        tests: [
          {
            id: 'H03',
            tid: 'H-03',
            name: 'All Properties Listed With Verification Status',
            sub: 'Super admin sees every property; unverified marked clearly',
            steps: [
              'Navigate to the Properties section of the web admin portal',
              'Confirm "Test Towers" (from B-02) is listed',
              'Note the verification status badge (Verified / Unverified)',
              'Filter by "Unverified" — confirm only unverified properties appear'
            ],
            passCriteria: [
              'All properties listed with names, owner name, and verification status',
              'Test Towers shown as "Unverified" (if not verified yet)',
              'Filter by status works correctly'
            ]
          },
          {
            id: 'H04',
            tid: 'H-04',
            name: 'Verify a Property — Owner App Unlocks Gated Features',
            sub: 'Super admin verifies Test Towers; owner app reflects verification without reinstall',
            steps: [
              'In web portal → Properties → Test Towers → click "Verify Property"',
              'Confirm confirmation dialog → click Confirm',
              'Test Towers should now show "Verified" badge in the list',
              'On the owner\'s mobile app, pull to refresh — confirm any "Pending Verification" banner disappears',
              'Attempt a feature that was previously gated — confirm it is now accessible'
            ],
            passCriteria: [
              'Property shows "Verified" in web portal immediately after action',
              'Owner app reflects verification on next pull-to-refresh (no reinstall needed)',
              'Gated feature becomes accessible to owner'
            ]
          }
        ]
      },
      {
        header: 'User Management & Analytics',
        tests: [
          {
            id: 'H05',
            tid: 'H-05',
            name: 'Search User by Phone — See Roles and Status',
            sub: 'Super admin can look up any user and see their profile + roles',
            steps: [
              'Navigate to Users section in the web portal',
              'Search for <code>9000000002</code> (Ravi Kumar, tenant — unit A-101)',
              'Confirm user record shown with: phone, name, roles, and active status',
              'Search for <code>9000000001</code> (property admin account)',
              'Confirm roles show <code>property_admin</code> in their roles list'
            ],
            passCriteria: [
              'User found by phone number search',
              'Correct roles displayed for each account',
              'Active/inactive status visible'
            ]
          },
          {
            id: 'H06',
            tid: 'H-06',
            name: 'Analytics / Reports Tab Loads Without Error',
            sub: 'All analytics sub-tabs render; no broken charts or blank screens',
            steps: [
              'Navigate to Analytics or Reports in the web portal',
              'Tap through each analytics sub-tab (Properties, Users, Revenue, Visitors — or whichever tabs exist)',
              'On each: confirm charts or tables render (not blank or crashed)',
              'Change the date filter to "Last 7 days" — confirm data updates'
            ],
            passCriteria: [
              'All analytics tabs load without error',
              'Charts render with data (or an empty-state message if no data yet — not a crash)',
              'Date filter changes the displayed data'
            ]
          },
          {
            id: 'H07',
            tid: 'H-07',
            name: 'Web Portal — Session Persists After Browser Refresh',
            sub: 'Refreshing the browser does not log out the super admin',
            steps: [
              'While logged in as super admin, press F5 (browser refresh)',
              'Confirm you stay on the admin dashboard (not redirected to login)',
              'Close the browser tab and reopen the web portal URL — confirm auto-login (session still valid)'
            ],
            passCriteria: [
              'Browser refresh keeps user on dashboard',
              'New tab with the same URL auto-logs in (session token persisted)'
            ]
          }
        ]
      },
      {
        header: 'Tenant & Visitor Management (Web)',
        tests: [
          {
            id: 'H08',
            tid: 'H-08',
            name: 'Tenants Page — List, Search, and View Tenant Profile',
            sub: 'Web admin can search for tenants and view their tenancy details',
            preconditions: [
              'Logged in as super_admin on web portal'
            ],
            steps: [
              'Navigate to <code>/tenants</code>',
              'Search for a tenant by phone (<code>+919000000002</code>) — expect to find Ravi Kumar, unit A-101, Sunshine Towers',
              'Open the tenant detail page',
              'Verify unit, lease dates, and status'
            ],
            passCriteria: [
              'Tenant list loads with names, units, and status',
              'Search by phone returns the correct tenant',
              'Detail page shows lease start/end, rent amount, and unit number'
            ],
            failCriteria: [
              'Search returns no results for a valid phone',
              'Detail page blank or shows wrong lease info'
            ]
          },
          {
            id: 'H09',
            tid: 'H-09',
            name: 'Visitors Page (Web) — View All Visitor Entries Across Properties',
            sub: 'Super admin sees all visitor log entries on the web portal',
            preconditions: [
              'Logged in as super_admin'
            ],
            steps: [
              'Navigate to <code>/visitors</code>',
              'Apply a property filter',
              'Search by visitor name'
            ],
            passCriteria: [
              'Visitor log loads with name, type, unit, check-in/out times',
              'Property filter narrows results to that property',
              'Name search works case-insensitively'
            ],
            failCriteria: [
              'Visitors from ALL properties shown even with filter applied',
              'Log is empty despite guard check-ins'
            ]
          },
          {
            id: 'H10',
            tid: 'H-10',
            name: 'Create New Tenant (Web) — Add a Tenant to a Unit',
            sub: 'Admin creates a new tenant record via the web portal',
            preconditions: [
              'Logged in as super_admin or property_admin level web user',
              'An unoccupied unit exists'
            ],
            steps: [
              'Navigate to <code>/tenants/new</code>',
              'Fill in tenant name, phone, unit, lease start/end, rent amount',
              'Submit'
            ],
            passCriteria: [
              'Tenant created and listed on <code>/tenants</code>',
              'Tenant can log in on mobile and sees their home dashboard',
              'Unit marked as occupied'
            ],
            failCriteria: [
              'Form accepts submission but tenant not in database',
              'Unit remains vacant after tenant creation',
              'Duplicate tenant allowed for same phone'
            ]
          }
        ]
      },
      {
        header: 'Billing, Disputes & Payments (Web)',
        tests: [
          {
            id: 'H11',
            tid: 'H-11',
            name: 'Billing Page — View Generated Bills',
            sub: 'Web admin sees all bills generated for a property',
            preconditions: [
              'Logged in as super_admin'
            ],
            steps: [
              'Navigate to <code>/billing</code>',
              'Filter by property',
              'Check a specific month\'s bills'
            ],
            passCriteria: [
              'Bills listed with tenant name, unit, amount, and status (Paid/Unpaid)',
              'Property filter works correctly',
              'Unpaid bills highlighted or distinguished from paid'
            ],
            failCriteria: [
              'Bills missing for months where generation was confirmed',
              'Paid bills still show as Unpaid'
            ]
          },
          {
            id: 'H12',
            tid: 'H-12',
            name: 'Bill Disputes Page — View and Resolve Disputes (Web)',
            sub: 'Super admin resolves tenant billing disputes via web portal',
            preconditions: [
              'Logged in as super_admin',
              'At least one dispute exists (D-14)'
            ],
            steps: [
              'Navigate to <code>/bill-disputes</code>',
              'Open an open dispute',
              'Add resolution note and mark Resolved'
            ],
            passCriteria: [
              'Dispute detail shows tenant, unit, disputed amount, and reason',
              'Resolved status persists after page refresh',
              'Tenant sees Resolved status in mobile app'
            ],
            failCriteria: [
              'Resolve action has no confirmation',
              'Status not saved after page refresh'
            ]
          },
          {
            id: 'H13',
            tid: 'H-13',
            name: 'Payments Page — View Payment History (Web)',
            sub: 'Admin sees all received payments on the web portal',
            preconditions: [
              'Logged in as super_admin'
            ],
            steps: [
              'Navigate to <code>/payments</code>',
              'Filter by property and month'
            ],
            passCriteria: [
              'Payment records with tenant, unit, amount, payment date, and method',
              'Filter narrows to correct property and month',
              'Total collected shown at top'
            ],
            failCriteria: [
              'Payments empty despite mobile app showing them as received',
              'Filter has no effect'
            ]
          }
        ]
      },
      {
        header: 'Maintenance, Complaints & Documents (Web)',
        tests: [
          {
            id: 'H14',
            tid: 'H-14',
            name: 'Maintenance Requests (Web) — View and Update Status',
            sub: 'Admin views and responds to maintenance requests via web',
            preconditions: [
              'Logged in as super_admin or property admin web user',
              'At least one maintenance request exists'
            ],
            steps: [
              'Navigate to <code>/maintenance</code>',
              'Open a request',
              'Change status to Resolved and add a note'
            ],
            passCriteria: [
              'Request list with category, tenant, unit, status',
              'Status update saved and reflected in mobile app',
              'Note visible to tenant in mobile'
            ],
            failCriteria: [
              'Status change not reflected in mobile',
              'Note not visible to tenant'
            ]
          },
          {
            id: 'H15',
            tid: 'H-15',
            name: 'Complaints Page (Web) — List and Respond',
            sub: 'Admin manages resident complaints on the web',
            preconditions: [
              'Logged in as super_admin'
            ],
            steps: [
              'Navigate to <code>/complaints</code>',
              'Open a complaint',
              'Add a response and change status to Resolved'
            ],
            passCriteria: [
              'Complaint detail shows submitter, category, description, and date',
              'Response saved and status updated',
              'Resolved complaints filterable from open ones'
            ],
            failCriteria: [
              'Response not saved',
              'Status change not persisted'
            ]
          },
          {
            id: 'H16',
            tid: 'H-16',
            name: 'Documents Page — Upload and View Property Documents',
            sub: 'Admin manages property documents via web portal',
            preconditions: [
              'Logged in as super_admin'
            ],
            steps: [
              'Navigate to <code>/documents</code>',
              'Upload a PDF (e.g., property agreement)',
              'Verify it appears in the document list'
            ],
            passCriteria: [
              'Document list loads without error',
              'Uploaded document shows with name, type, and upload date',
              'Document is downloadable'
            ],
            failCriteria: [
              'Upload fails with no error message',
              'Uploaded document not visible after page refresh'
            ]
          }
        ]
      },
      {
        header: 'Staff, Guards & Vendors (Web)',
        tests: [
          {
            id: 'H17',
            tid: 'H-17',
            name: 'Staff Page (Web) — View and Manage Staff',
            sub: 'Admin manages staff records on the web portal',
            preconditions: [
              'Logged in as super_admin'
            ],
            steps: [
              'Navigate to <code>/staff</code>',
              'Add a new staff member',
              'Remove an existing one'
            ],
            passCriteria: [
              'Staff list with name, role, and joined date',
              'Add action creates a new record',
              'Remove action with confirmation removes the record'
            ],
            failCriteria: [
              'No confirmation on remove',
              'Added staff not visible after page refresh'
            ]
          },
          {
            id: 'H18',
            tid: 'H-18',
            name: 'Guards Page (Web) — View Guard Assignments',
            sub: 'Web admin sees all guards and their property assignments',
            preconditions: [
              'Logged in as super_admin'
            ],
            steps: [
              'Navigate to <code>/guards</code>'
            ],
            passCriteria: [
              'All guards listed with name, phone, and assigned property',
              'Unassigned guards shown separately',
              'Link to assign a guard to a property if unassigned'
            ],
            failCriteria: [
              'Guards from wrong properties shown',
              'Assignment status incorrect'
            ]
          },
          {
            id: 'H19',
            tid: 'H-19',
            name: 'Vendors Page (Web) — List and Search Vendors',
            sub: 'Web admin views and manages registered vendors',
            preconditions: [
              'Logged in as super_admin'
            ],
            steps: [
              'Navigate to <code>/vendors</code>',
              'Search by vendor name',
              'View vendor detail'
            ],
            passCriteria: [
              'Vendor list with name, service type, rating',
              'Search works correctly',
              'Vendor detail shows contact info'
            ],
            failCriteria: [
              'Search crashes or shows wrong results',
              'Vendor detail blank'
            ]
          }
        ]
      },
      {
        header: 'Expenses, Meetings & Emergency (Web)',
        tests: [
          {
            id: 'H20',
            tid: 'H-20',
            name: 'Expenses Page (Web) — View Society Expenditures',
            sub: 'Admin sees all expense records on web portal',
            preconditions: [
              'Logged in as super_admin'
            ],
            steps: [
              'Navigate to <code>/expenses</code>',
              'Filter by month'
            ],
            passCriteria: [
              'Expense list with category, amount, date, description',
              'Monthly total shown',
              'Filter works by calendar month'
            ],
            failCriteria: [
              'Expenses missing for recorded months',
              'Total incorrect'
            ]
          },
          {
            id: 'H21',
            tid: 'H-21',
            name: 'Meetings Page (Web) — Create and View Meeting Minutes',
            sub: 'Admin creates meeting records via web portal',
            preconditions: [
              'Logged in as super_admin'
            ],
            steps: [
              'Navigate to <code>/meetings</code>',
              'Create a new meeting with title, date, and minutes text',
              'Save and verify'
            ],
            passCriteria: [
              'Meeting saved and listed',
              'Meeting text/minutes viewable on detail page',
              'Meeting visible from mobile admin app'
            ],
            failCriteria: [
              'Meeting not saved',
              'Minutes text truncated on save'
            ]
          },
          {
            id: 'H22',
            tid: 'H-22',
            name: 'Emergency Contacts (Web) — Manage Property Emergency Numbers',
            sub: 'Admin manages emergency contacts via web',
            preconditions: [
              'Logged in as super_admin'
            ],
            steps: [
              'Navigate to <code>/emergency</code>',
              'Add a contact with name, role, and phone',
              'Save and verify'
            ],
            passCriteria: [
              'Contact added to list',
              'Contact visible on mobile OwnerEmergencyContacts (B-29)'
            ],
            failCriteria: [
              'Contact not visible on mobile after web add'
            ]
          }
        ]
      },
      {
        header: 'Parking, Move-Out & Family Members (Web)',
        tests: [
          {
            id: 'H23',
            tid: 'H-23',
            name: 'Parking Page (Web) — Manage Slot Allocations',
            sub: 'Admin manages parking from web portal',
            preconditions: [
              'Logged in as super_admin'
            ],
            steps: [
              'Navigate to <code>/parking</code>',
              'Assign a slot to a unit',
              'Verify in mobile'
            ],
            passCriteria: [
              'Slot assignment visible on both web and mobile',
              'Double-assignment prevented'
            ],
            failCriteria: [
              'Assignment not synced to mobile'
            ]
          },
          {
            id: 'H24',
            tid: 'H-24',
            name: 'Move-Out Page (Web) — Process Tenant Move-Out',
            sub: 'Admin processes tenant move-out via web portal',
            preconditions: [
              'Logged in as super_admin',
              'An active tenant exists'
            ],
            steps: [
              'Navigate to <code>/move-out</code>',
              'Select a tenant and initiate move-out',
              'Confirm'
            ],
            passCriteria: [
              'Tenant removed from unit',
              'Unit shows Vacant after move-out',
              'Tenant\'s mobile app shows \'Find Apartment\' state'
            ],
            failCriteria: [
              'Unit still occupied after move-out on web',
              'No confirmation before action'
            ]
          },
          {
            id: 'H25',
            tid: 'H-25',
            name: 'Family Members Page (Web) — View Family Member Associations',
            sub: 'Web admin sees all family member records across properties',
            preconditions: [
              'Logged in as super_admin'
            ],
            steps: [
              'Navigate to <code>/family-members</code>',
              'Filter by property'
            ],
            passCriteria: [
              'Family members listed with primary tenant, unit, relationship, invite status',
              'Filter works by property',
              'Pending invites distinguished from accepted'
            ],
            failCriteria: [
              'All family members from all properties shown without filter',
              'Invite status incorrect'
            ]
          }
        ]
      },
      {
        header: 'Reports, Announcements & Polls (Web)',
        tests: [
          {
            id: 'H26',
            tid: 'H-26',
            name: 'Reports Page (Web) — Generate and Download PDF Report',
            sub: 'Super admin generates a property report as PDF',
            preconditions: [
              'Logged in as super_admin'
            ],
            steps: [
              'Navigate to <code>/reports</code>',
              'Select report type (Overview, Collection, Maintenance, Defaulters)',
              'Select property and date range',
              'Click Generate / Download'
            ],
            passCriteria: [
              'Report generates and downloads as PDF',
              'PDF contains correct data for the selected period',
              'Report for 0-data period shows empty state gracefully (not error)'
            ],
            failCriteria: [
              'Download fails or produces empty PDF',
              'Report shows data from wrong property'
            ]
          },
          {
            id: 'H27',
            tid: 'H-27',
            name: 'Announcements Page (Web) — Create and Publish',
            sub: 'Admin creates a platform-wide or property-specific announcement via web',
            preconditions: [
              'Logged in as super_admin'
            ],
            steps: [
              'Navigate to <code>/announcements</code>',
              'Create a new announcement with title and body',
              'Publish to a specific property',
              'Verify on mobile (community feed)'
            ],
            passCriteria: [
              'Announcement visible in mobile community feed within 60 seconds',
              'Author shown as admin name',
              'Announcement appears in correct property only'
            ],
            failCriteria: [
              'Announcement not visible on mobile',
              'Shows to all properties instead of selected one'
            ]
          },
          {
            id: 'H28',
            tid: 'H-28',
            name: 'Polls Page (Web) — Create a Poll and View Results',
            sub: 'Admin creates a poll from web and sees results after tenant votes',
            preconditions: [
              'Logged in as super_admin'
            ],
            steps: [
              'Navigate to <code>/polls</code>',
              'Create a poll with question and 3 options',
              'Set end date, publish',
              'From mobile (tenant), vote on the poll',
              'Refresh web polls page and check results'
            ],
            passCriteria: [
              'Poll visible on mobile for tenants',
              'Vote registered on web results page',
              'Percentages correct after vote'
            ],
            failCriteria: [
              'Poll not visible on mobile',
              'Results not updated on web after mobile vote'
            ]
          }
        ]
      },
      {
        header: 'Support Tickets & Audit Logs (Web)',
        tests: [
          {
            id: 'H29',
            tid: 'H-29',
            name: 'Support Tickets Page (Web) — View and Respond to User Tickets',
            sub: 'Super admin manages support tickets from web portal',
            preconditions: [
              'Logged in as super_admin',
              'At least one support ticket submitted from mobile'
            ],
            steps: [
              'Navigate to <code>/support-tickets</code>',
              'Open a ticket',
              'Add a response and change status to Resolved'
            ],
            passCriteria: [
              'Ticket list with submitter, category, status, and date',
              'Response saved and ticket status updated',
              'Ticket submitter notified on mobile'
            ],
            failCriteria: [
              'Response not saved',
              'Status not updated after action'
            ]
          },
          {
            id: 'H30',
            tid: 'H-30',
            name: 'Audit Logs Page (Web) — View Admin Action History',
            sub: 'Super admin reviews all system actions via web audit trail',
            preconditions: [
              'Logged in as super_admin'
            ],
            steps: [
              'Navigate to <code>/audit-logs</code>',
              'Filter by actor or action type',
              'View a specific log entry'
            ],
            passCriteria: [
              'Log entries with actor name, action, target, and timestamp',
              'Filter by actor narrows results',
              'Filter by action type works',
              'Entries sorted newest first'
            ],
            failCriteria: [
              'Log empty despite known actions',
              'Filter has no effect',
              'Entries in wrong order'
            ]
          }
        ]
      },
      {
        header: 'Managers, Amenity Bookings & Notifications (Web)',
        tests: [
          {
            id: 'H31',
            tid: 'H-31',
            name: 'Managers Page (Web) — View Appointed Managers',
            sub: 'Web admin sees all appointed managers and their properties',
            preconditions: [
              'Logged in as super_admin'
            ],
            steps: [
              'Navigate to <code>/managers</code>'
            ],
            passCriteria: [
              'Manager list with name, phone, property, and appointment date',
              'Active vs. revoked managers distinguished'
            ],
            failCriteria: [
              'Revoked managers shown as active',
              'List empty despite active manager appointments'
            ]
          },
          {
            id: 'H32',
            tid: 'H-32',
            name: 'Amenity Bookings Page (Web) — Manage All Bookings',
            sub: 'Admin reviews and manages all amenity bookings via web',
            preconditions: [
              'Logged in as super_admin'
            ],
            steps: [
              'Navigate to <code>/amenity-bookings</code>',
              'Filter by amenity or date',
              'Approve a pending booking',
              'Cancel a booking'
            ],
            passCriteria: [
              'Booking list with amenity, tenant, slot, status',
              'Approve/Cancel actions persist',
              'Status reflected in mobile tenant app'
            ],
            failCriteria: [
              'Actions not reflected in mobile app',
              'Double-bookings visible for same slot'
            ]
          },
          {
            id: 'H33',
            tid: 'H-33',
            name: 'Notifications Page (Web) — Send Push Notification to Property',
            sub: 'Admin sends a push notification from web to all tenants of a property',
            preconditions: [
              'Logged in as super_admin'
            ],
            steps: [
              'Navigate to <code>/notifications</code>',
              'Select a property',
              'Enter notification title and body',
              'Send'
            ],
            passCriteria: [
              'All active tenants of the selected property receive the push notification',
              'Notification appears in tenant\'s TenantNotifications screen',
              'Sending to a property with 0 tenants shows appropriate warning (not a crash)'
            ],
            failCriteria: [
              'Notification not received by tenants',
              'Notification sent to tenants of wrong property'
            ]
          }
        ]
      },
      {
        header: 'Super Admin Sub-Pages',
        tests: [
          {
            id: 'H34',
            tid: 'H-34',
            name: 'Super Admin — Platform Announcements',
            sub: 'Super admin publishes a platform-wide announcement to all users',
            preconditions: [
              'Logged in as super_admin',
              'Access <code>/super-admin/announcements</code>'
            ],
            steps: [
              'Navigate to <code>/super-admin/announcements</code>',
              'Create a platform-wide announcement',
              'Verify it appears as PlatformAnnouncement in all users\' apps'
            ],
            passCriteria: [
              'Announcement appears in all active users\' notification feeds',
              'Platform announcement type distinct from property announcement'
            ],
            failCriteria: [
              'Announcement only visible to one property',
              'PlatformAnnouncements screen on mobile shows nothing'
            ]
          },
          {
            id: 'H35',
            tid: 'H-35',
            name: 'Super Admin — Config / Feature Flags',
            sub: 'Super admin views and modifies feature flag configuration',
            preconditions: [
              'Logged in as super_admin',
              'Access <code>/super-admin/config</code>'
            ],
            steps: [
              'Navigate to <code>/super-admin/config</code>',
              'Observe available configuration options',
              'Toggle a non-critical feature flag',
              'Verify change is applied'
            ],
            passCriteria: [
              'Config page loads with current flag states',
              'Toggling a flag saves immediately or with a Save action',
              'Change reflected in app behavior without deploy'
            ],
            failCriteria: [
              'Page blank or crashes',
              'Flag change not persisted after page refresh'
            ]
          },
          {
            id: 'H36',
            tid: 'H-36',
            name: 'Super Admin — Health Check Dashboard',
            sub: 'Super admin monitors system health metrics',
            preconditions: [
              'Logged in as super_admin',
              'Access <code>/super-admin/health</code>'
            ],
            steps: [
              'Navigate to <code>/super-admin/health</code>',
              'Observe health metrics'
            ],
            passCriteria: [
              'Health page shows service status (DB, Redis, API, notifications)',
              'All services show as \'OK\' or \'Degraded\' with clear labels',
              'Page auto-refreshes or has a manual refresh button'
            ],
            failCriteria: [
              'Page is blank or shows a 500 error',
              'No health indicators shown'
            ]
          },
          {
            id: 'H37',
            tid: 'H-37',
            name: 'Super Admin — Revenue Dashboard',
            sub: 'Super admin views subscription revenue and active properties',
            preconditions: [
              'Logged in as super_admin',
              'Access <code>/super-admin/revenue</code>'
            ],
            steps: [
              'Navigate to <code>/super-admin/revenue</code>',
              'View revenue metrics'
            ],
            passCriteria: [
              'Dashboard shows total active subscriptions, monthly revenue, and growth metrics',
              'Data broken down by plan tier (if applicable)',
              'Numbers are consistent with known test data'
            ],
            failCriteria: [
              'Dashboard blank',
              'Numbers clearly incorrect (e.g., negative revenue)'
            ]
          },
          {
            id: 'H38',
            tid: 'H-38',
            name: 'Super Admin — Support Console',
            sub: 'Super admin manages escalated support tickets from all users',
            preconditions: [
              'Logged in as super_admin',
              'Access <code>/super-admin/support-console</code>'
            ],
            steps: [
              'Navigate to <code>/super-admin/support-console</code>',
              'View open tickets',
              'Respond to one ticket'
            ],
            passCriteria: [
              'All user support tickets visible (not just one property)',
              'Response action works and ticket status updates'
            ],
            failCriteria: [
              'Only shows one property\'s tickets',
              'Response fails silently'
            ]
          },
          {
            id: 'H39',
            tid: 'H-39',
            name: 'Super Admin — Property Modules Configuration',
            sub: 'Super admin enables/disables feature modules per property',
            preconditions: [
              'Logged in as super_admin',
              'Access <code>/super-admin/property-modules</code>'
            ],
            steps: [
              'Navigate to <code>/super-admin/property-modules</code>',
              'Select a property',
              'Toggle a module (e.g., disable Polls for that property)',
              'Verify Polls tab is hidden for users of that property'
            ],
            passCriteria: [
              'Module toggle saved for the specific property',
              'Change reflected in mobile app without re-deploy',
              'Other properties unaffected by the change'
            ],
            failCriteria: [
              'Module disabled but still shown in mobile',
              'Change affects all properties instead of selected one'
            ]
          },
          {
            id: 'H40',
            tid: 'H-40',
            name: 'Super Admin — Onboarding Flows',
            sub: 'Super admin views and manages new property onboarding templates',
            preconditions: [
              'Logged in as super_admin',
              'Access <code>/super-admin/onboarding</code>'
            ],
            steps: [
              'Navigate to <code>/super-admin/onboarding</code>',
              'View onboarding flow templates',
              'Navigate to <code>/super-admin/onboarding/new</code>',
              'Create a new onboarding template'
            ],
            passCriteria: [
              'Onboarding templates listed with names and step counts',
              'New template can be created with steps',
              'Template saved and visible in list'
            ],
            failCriteria: [
              'Page blank or crashes',
              'Template not saved after creation'
            ]
          }
        ]
      }
    ]
  }
];
