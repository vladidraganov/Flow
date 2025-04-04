import { supabase } from '@/lib/supabase';

export const fetchPowerups = async () => {
  const { data, error } = await supabase
    .from('powerups')
    .select('*');

  if (error) {
    console.error('Error fetching power-ups:', error.message, error.details, error.hint);
    return [];
  }

  return data;
};