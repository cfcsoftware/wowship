'use client';

import React from 'react';
import Link from 'next/link';

const NotFoundPage = () => {
  const styles = `
    .ogdine-fade-in {
      animation: ogdineFadeIn 1.2s ease-out forwards;
      opacity: 0;
    }
    .ogdine-btn {
      background: #f57c00;
      color: #fff;
      font-weight: bold;
      border: none;
      border-radius: 0.7em;
      padding: 1em 2em;
      cursor: pointer;
      font-size: 1.1em;
      box-shadow: 0 8px 36px #f57c0030;
      transition: background 0.22s, box-shadow 0.15s;
      outline: none;
      text-decoration: none;
      display: inline-block;
      margin: .5em;
    }
    .ogdine-btn:hover, .ogdine-btn:focus {
      background: #e65100;
      box-shadow: 0 12px 48px #f57c0080;
      text-decoration: none;
    }
    .ogdine-food-404 {
      font-size: clamp(5rem, 15vw, 8.5rem);
      line-height: 1;
      font-family: 'Pacifico', cursive, sans-serif;
      color: #f57c00;
      filter: drop-shadow(0 0 12px #fcc847b5);
      user-select: none;
      letter-spacing: 2px;
    }
    .ogdine-bg {
      background: linear-gradient(120deg, #fff3e0 0%, #ffe0b2 100%);
      min-height: 100vh;
    }
    @keyframes ogdineFadeIn {
      from { opacity: 0; transform: translateY(32px);}
      to { opacity: 1; transform: translateY(0);}
    }
    .ogdine-icon {
      font-size: 2.8em;
      filter: drop-shadow(0 2px 18px #fbc02d33);
      margin-bottom: 0.5em;
      animation: ogdineWobble 4s ease-in-out infinite;
      display: inline-block;
    }
    @keyframes ogdineWobble {
      0%,100% { transform: rotate(-2deg) scale(1);}
      12% { transform: rotate(6deg) scale(1.07);}
      25% { transform: rotate(-6deg) scale(1);}
      37% { transform: rotate(4deg) scale(1.04);}
      50% { transform: rotate(-2deg) scale(1);}
      65% { transform: rotate(0) scale(1.01);}
      75% { transform: rotate(2deg) scale(1.02);}
      100% { transform: rotate(-2deg) scale(1);}
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="ogdine-bg" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        fontFamily: '"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif',
        backgroundAttachment: 'fixed',
        position: 'relative',
        zIndex: 0
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          borderRadius: '1.3rem',
          boxShadow: '0 4px 32px #fbc02d18',
          padding: '3.5rem 2rem 2.5rem 2rem',
          textAlign: 'center',
          maxWidth: 420,
          margin: '0 1rem'
        }}>
          <span className="ogdine-icon" role="img" aria-label="cloche">&#x1F372;</span>
          <div className="ogdine-food-404 ogdine-fade-in" style={{animationDelay: '0.1s'}}>404</div>
          <h1 className="ogdine-fade-in" style={{
            fontWeight: 800,
            fontSize: '2.2rem',
            color: '#d84315',
            margin: '1.0rem 0 0.5rem 0',
            letterSpacing: '.05rem',
            lineHeight: 1.2,
            animationDelay: '0.35s'
          }}>
            Page Not Found
          </h1>
          <div className="ogdine-fade-in" style={{
            color: '#8d6e63',
            fontSize: '1.13rem',
            margin: '0 auto 1.7rem auto',
            lineHeight: 1.7,
            maxWidth: 310,
            animationDelay: '0.55s'
          }}>
            Oops! Looks like the page you were hungry for isn&#39;t on the menu.<br />
            Head back to Logicore-ERP and discover our delicious dishes!
          </div>
          <div className="ogdine-fade-in" style={{animationDelay: '0.7s'}}>
            <Link href="/" legacyBehavior>
              <a className="ogdine-btn">Go To Home</a>
            </Link>
            <Link href="/menu" legacyBehavior>
              <a className="ogdine-btn" style={{ background: '#fbc02d', color: '#7e5700' }}>View Menu</a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;