// @ts-nocheck
import { createClient } from 'npm:@supabase/supabase-js@2.39.0';
import whois from 'npm:whois-json@1.3.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const domain = url.searchParams.get('domain');

    if (!domain) {
      throw new Error('Domain name is required');
    }

    const whoisData = await whois(domain);

    if (!whoisData) {
      throw new Error('Failed to lookup domain information');
    }

    const formattedData = {
      domain: whoisData.domainName || domain,
      domain_id: whoisData.registryDomainId || '',
      status: Array.isArray(whoisData.status) ? whoisData.status : [whoisData.status || 'unknown'],
      created: whoisData.creationDate || '',
      updated: whoisData.updatedDate || '',
      expires: whoisData.registryExpiryDate || '',
      registrar: {
        name: whoisData.registrar || '',
        url: whoisData.registrarUrl || '',
        email: whoisData.registrarAbuseContactEmail || '',
        phone: whoisData.registrarAbuseContactPhone || '',
      },
      registrant: {
        name: whoisData.registrantName || 'REDACTED FOR PRIVACY',
        organization: whoisData.registrantOrganization || 'REDACTED FOR PRIVACY',
        street: whoisData.registrantStreet || 'REDACTED FOR PRIVACY',
        city: whoisData.registrantCity || 'REDACTED FOR PRIVACY',
        state: whoisData.registrantStateProvince || '',
        postal_code: whoisData.registrantPostalCode || 'REDACTED FOR PRIVACY',
        country: whoisData.registrantCountry || '',
        phone: whoisData.registrantPhone || 'REDACTED FOR PRIVACY',
        email: whoisData.registrantEmail || 'REDACTED FOR PRIVACY',
      },
      nameservers: Array.isArray(whoisData.nameServer) 
        ? whoisData.nameServer 
        : whoisData.nameServer 
          ? [whoisData.nameServer] 
          : [],
      dnssec: whoisData.dnssec === 'signedDelegation',
    };

    return new Response(JSON.stringify(formattedData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});