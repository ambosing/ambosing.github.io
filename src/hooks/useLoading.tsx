import { useState, useEffect } from 'react';

const useLoading = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleDOMContentLoaded = () => setLoading(false);

    if (
      document.readyState === 'complete' ||
      document.readyState === 'interactive'
    ) {
      handleDOMContentLoaded();
    } else {
      document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
    }

    return () =>
      document.removeEventListener('DOMContentLoaded', handleDOMContentLoaded);
  }, []);

  return loading;
};

export default useLoading;
