import { useState, useEffect, useCallback } from 'react';
import { IpDetails, SystemInfo } from '../types';

export const useMyIp = () => {
  const [ipData, setIpData] = useState<IpDetails | null>(null);
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getMyIp = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('https://ipapi.co/json/');

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const result = await response.json();

      if (result.error) {
        throw new Error(result.reason || 'Failed to lookup IP address');
      }

      const ipDetails: IpDetails = {
        ip: result.ip,
        version: result.version,
        city: result.city,
        region: result.region,
        region_code: result.region_code,
        country: result.country,
        country_name: result.country_name,
        country_code: result.country_code,
        country_code_iso3: result.country_code_iso3,
        country_capital: result.country_capital,
        continent_code: result.continent_code,
        postal: result.postal,
        latitude: result.latitude,
        longitude: result.longitude,
        timezone: result.timezone,
        utc_offset: result.utc_offset,
        asn: result.asn,
        org: result.org,
        isp: result.isp || result.org,
        languages: result.languages,
        currency: result.currency,
        currency_name: result.currency_name,
        currency_symbol: result.currency_symbol,
        connection: {
          type: 'unknown',
          mobile: false,
          proxy: false,
          vpn: false,
          tor: false
        }
      };

      setIpData(ipDetails);

      // get system information
      const sysInfo = getSystemInfo();
      setSystemInfo(sysInfo);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const getSystemInfo = (): SystemInfo => {
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;


    const isChrome = userAgent.indexOf('Chrome') > -1;
    const isFirefox = userAgent.indexOf('Firefox') > -1;
    const isSafari = userAgent.indexOf('Safari') > -1 && !isChrome;
    const isEdge = userAgent.indexOf('Edg') > -1;
    const isIE = userAgent.indexOf('MSIE') > -1 || userAgent.indexOf('Trident/') > -1;

    let browserName = 'Unknown';
    let browserVersion = 'Unknown';

    if (isEdge) {
      browserName = 'Microsoft Edge';
      const version = userAgent.match(/Edg\/(\d+\.\d+)/);
      browserVersion = version ? version[1] : 'Unknown';
    } else if (isChrome) {
      browserName = 'Google Chrome';
      const version = userAgent.match(/Chrome\/(\d+\.\d+)/);
      browserVersion = version ? version[1] : 'Unknown';
    } else if (isFirefox) {
      browserName = 'Mozilla Firefox';
      const version = userAgent.match(/Firefox\/(\d+\.\d+)/);
      browserVersion = version ? version[1] : 'Unknown';
    } else if (isSafari) {
      browserName = 'Safari';
      const version = userAgent.match(/Version\/(\d+\.\d+)/);
      browserVersion = version ? version[1] : 'Unknown';
    } else if (isIE) {
      browserName = 'Internet Explorer';
      const version = userAgent.match(/(?:MSIE |rv:)(\d+\.\d+)/);
      browserVersion = version ? version[1] : 'Unknown';
    }


    let osName = 'Unknown';
    let osVersion = 'Unknown';

    if (userAgent.indexOf('Windows') > -1) {
      osName = 'Windows';
      if (userAgent.indexOf('Windows NT 10.0') > -1) osVersion = '10/11';
      else if (userAgent.indexOf('Windows NT 6.3') > -1) osVersion = '8.1';
      else if (userAgent.indexOf('Windows NT 6.2') > -1) osVersion = '8';
      else if (userAgent.indexOf('Windows NT 6.1') > -1) osVersion = '7';
      else if (userAgent.indexOf('Windows NT 6.0') > -1) osVersion = 'Vista';
    } else if (userAgent.indexOf('Mac') > -1) {
      osName = 'macOS';
      const version = userAgent.match(/Mac OS X (\d+[._]\d+)/);
      if (version) {
        osVersion = version[1].replace('_', '.');
      }
    } else if (userAgent.indexOf('Android') > -1) {
      osName = 'Android';
      const version = userAgent.match(/Android (\d+\.\d+)/);
      osVersion = version ? version[1] : 'Unknown';
    } else if (userAgent.indexOf('iOS') > -1 || userAgent.indexOf('iPhone') > -1 || userAgent.indexOf('iPad') > -1) {
      osName = 'iOS';
      const version = userAgent.match(/OS (\d+[._]\d+)/);
      if (version) {
        osVersion = version[1].replace('_', '.');
      }
    } else if (userAgent.indexOf('Linux') > -1) {
      osName = 'Linux';
    }


    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    const isTablet = /iPad|Android(?!.*Mobile)/i.test(userAgent);
    const isDesktop = !isMobile && !isTablet;


    let connection = {
      type: 'unknown',
      downlink: 0,
      rtt: 0,
      effectiveType: 'unknown'
    };

    if ('connection' in navigator) {
      const networkInfo = (navigator as any).connection;
      if (networkInfo) {
        connection = {
          type: networkInfo.type || 'unknown',
          downlink: networkInfo.downlink || 0,
          rtt: networkInfo.rtt || 0,
          effectiveType: networkInfo.effectiveType || 'unknown'
        };
      }
    }

    return {
      browser: {
        name: browserName,
        version: browserVersion,
        language: navigator.language,
        platform: platform,
        isMobile,
        isTablet,
        isDesktop
      },
      screen: {
        width: window.screen.width,
        height: window.screen.height,
        colorDepth: window.screen.colorDepth,
        orientation: window.screen.orientation ? window.screen.orientation.type : 'unknown'
      },
      os: {
        name: osName,
        version: osVersion
      },
      connection
    };
  };


  useEffect(() => {
    getMyIp();
  }, [getMyIp]);

  return { ipData, systemInfo, loading, error, refresh: getMyIp };
};

export default useMyIp;