import * as React from 'react';

export function EmailTemplate() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', background: '#f6f8fa', padding: 0, margin: 0 }}>
      <table width="100%" cellPadding={0} cellSpacing={0} style={{ background: '#f6f8fa', padding: '40px 0' }}>
        <tbody>
          <tr>
            <td align="center">
              <table width="480" style={{  borderRadius: 12, boxShadow: '0 2px 8px rgba(52,103,170,0.08)', overflow: 'hidden' }}>
                <tbody>
                  <tr>
                    <td style={{ background: '', padding: '24px 0', textAlign: 'center' }}>
                      <img src="https://www.jara-ai.com/_next/image?url=%2Flogo.png&w=128&q=75" alt="Logo" width="80" style={{ display: 'block', margin: '0 auto' }} />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: '32px 32px 16px 32px', textAlign: 'center' }}>
                      <h1 style={{ color: '#3467AA', fontSize: 28, margin: 0, fontWeight: 700 }}>Welcome to the Waiting List!</h1>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0 32px 24px 32px', textAlign: 'center' }}>
                      <p style={{ color: '#222', fontSize: 18, margin: '16px 0 0 0' }}>
                         Hi there,
                      </p>
                      <p style={{ color: '#222', fontSize: 16, margin: '16px 0 0 0' }}>
                        Thank you for joining our waiting list! 🎉<br />
                        We’re thrilled to have you on board and can’t wait to share something amazing with you soon.
                      </p>
                      <p style={{ color: '#3467AA', fontSize: 16, margin: '24px 0 0 0', fontWeight: 600 }}>
                        Stay tuned for updates!
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: '18px 32px', textAlign: 'center' }}>
                      <p style={{ color: '#fff', fontSize: 14, margin: 0 }}>
                        You’ll be the first to know when we launch. <br />
                        <span style={{ color: '#3467AA', fontWeight: 700 }}>Thank you for your support!</span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: '18px 32px', textAlign: 'center', color: '#888', fontSize: 12 }}>
                      &copy; {new Date().getFullYear()} Jara AI. All rights reserved.
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
} 