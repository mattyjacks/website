declare const process: {
  env: Record<string, string | undefined>;
};

export type EcosystemAppId =
  | "givegigs"
  | "mattyjacks"
  | "cryptartist-studio"
  | "cryptartist-website"
  | "venturecapitalarts";

export interface ControlPlaneApp {
  id: EcosystemAppId;
  name: string;
  url: string;
  description: string;
  controlledByGiveGigs: boolean;
  usesGiveGigsDatabase: boolean;
}

export interface ControlPlanePayload {
  controlPlane: {
    appId: "givegigs";
    version: string;
    generatedAt: string;
  };
  database: {
    sharedDatabase: true;
    authorityAppId: "givegigs";
    provider: "postgresql";
  };
  apps: ControlPlaneApp[];
  requestedApp: EcosystemAppId | null;
  user: {
    authenticated: boolean;
    supabaseId: string | null;
    email: string | null;
    internalUserId: string | null;
    isGiveGigsAdmin: boolean;
    canControlEcosystem: boolean;
    accessMode: "session" | "integration" | "anonymous";
  };
  admin: {
    url: string;
    access: "granted" | "denied";
  };
  links: {
    appsEndpoint: string;
    controlPlaneEndpoint: string;
  };
}

export interface EcosystemAppsPayload {
  version: string;
  generatedAt: string;
  authority: {
    appId: string;
    sharedDatabase: boolean;
    adminUrl: string;
  };
  apps: ControlPlaneApp[];
}

export interface ControlPlaneFetchOptions {
  app: EcosystemAppId;
  supabaseId?: string | null;
  email?: string | null;
}

function trimTrailingSlash(value: string): string {
  return value.replace(/\/+$/, "");
}

export function getGiveGigsControlPlaneBaseUrl(): string {
  const configured = process.env.GIVEGIGS_CONTROL_PLANE_URL?.trim();
  if (configured && configured.length > 0) {
    return trimTrailingSlash(configured);
  }

  return "https://givegigs.com";
}

export function getGiveGigsIntegrationKey(): string | undefined {
  const key = process.env.GIVEGIGS_CONTROL_PLANE_INTEGRATION_KEY?.trim();
  return key && key.length > 0 ? key : undefined;
}

export async function fetchControlPlane(
  options: ControlPlaneFetchOptions
): Promise<ControlPlanePayload | null> {
  const baseUrl = getGiveGigsControlPlaneBaseUrl();
  const url = `${baseUrl}/api/ecosystem/control-plane?app=${encodeURIComponent(options.app)}`;

  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  const integrationKey = getGiveGigsIntegrationKey();
  if (integrationKey) {
    headers["X-GiveGigs-Integration-Key"] = integrationKey;
  }

  if (options.supabaseId) {
    headers["X-GiveGigs-Supabase-Id"] = options.supabaseId;
  }

  if (options.email) {
    headers["X-GiveGigs-Email"] = options.email;
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers,
      cache: "no-store",
    });

    if (!response.ok) return null;

    const json = (await response.json()) as ControlPlanePayload;
    return json;
  } catch {
    return null;
  }
}

export async function fetchEcosystemApps(): Promise<EcosystemAppsPayload | null> {
  const baseUrl = getGiveGigsControlPlaneBaseUrl();
  const url = `${baseUrl}/api/ecosystem/apps`;

  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  const integrationKey = getGiveGigsIntegrationKey();
  if (integrationKey) {
    headers["X-GiveGigs-Integration-Key"] = integrationKey;
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers,
      cache: "no-store",
    });

    if (!response.ok) return null;

    return (await response.json()) as EcosystemAppsPayload;
  } catch {
    return null;
  }
}
