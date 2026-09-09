/**
 * Unified lead contract shared conceptually with the phone receptionist
 * (`voice/src/leads/schema.ts`). Website chat and forms should populate
 * these fields so both channels feed the same inbox (`POST /api/leads`).
 */

export type LeadSource = 'phone' | 'chatbot' | 'web_form';
export type CustomerType = 'residential' | 'commercial' | 'unknown';
export type EmergencyStatus = 'emergency' | 'urgent' | 'routine';
export type LeadStatus = 'incomplete' | 'confirmed' | 'submitted' | 'failed' | 'spam' | 'abandoned';

export interface UnifiedLeadFields {
  caller_name: string;
  caller_phone: string;
  service_address: string;
  customer_type: CustomerType;
  service_type: string;
  emergency_status: EmergencyStatus;
  problem_description: string;
  preferred_time: string;
  additional_notes: string;
  call_timestamp: string;
  call_duration: number | null;
  call_id: string | null;
  lead_source: LeadSource;
  lead_status: LeadStatus;
  transcript_reference: string | null;
  call_recording_reference: string | null;
}
