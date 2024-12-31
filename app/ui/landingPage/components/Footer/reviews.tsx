'use client';
import React from 'react';

declare global {
    interface Window {
        Trustpilot:any;
    }
}
const TrustBox = () => {
  // Create a reference to the <div> element which will represent the TrustBox
  const ref = React.useRef(null);
  React.useEffect(() => {
// If window.Trustpilot is available it means that we need to load the TrustBox from our ref.
// If it's not, it means the script you pasted into <head /> isn't loaded  just yet.
// When it is, it will automatically load the TrustBox.
if (window.Trustpilot) {
  window.Trustpilot.loadFromElement(ref.current, true);
}
  }, []);
  return (
<div
  ref={ref} // We need a reference to this element to load the TrustBox in the effect.
 className="trustpilot-widget" // Renamed this to className.
 data-locale="en-US" data-template-id="56278e9abfbbba0bdcd568bc" data-businessunit-id="67734c90bb1f9c4d559a9791" data-style-height="52px" data-style-width="100%"
>
  <a href="https://www.trustpilot.com/review/hiildhaxal.online" target="_blank"  rel="noopener" > Trustpilot</a>
</div>
  );
};
export default TrustBox;