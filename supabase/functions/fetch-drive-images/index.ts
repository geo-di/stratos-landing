
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { folderId } = await req.json()
    
    if (!folderId) {
      return new Response(
        JSON.stringify({ error: 'Folder ID is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    const apiKey = Deno.env.get('GOOGLE_DRIVE_API_KEY')
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'Google Drive API key not configured' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    // Fetch files from Google Drive folder
    const response = await fetch(
      `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${apiKey}&fields=files(id,name,mimeType,webViewLink)`
    )

    if (!response.ok) {
      console.error('Google Drive API error:', response.status, await response.text())
      return new Response(
        JSON.stringify({ error: 'Failed to fetch from Google Drive' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    const data = await response.json()
    
    // Filter for image files only and transform to gallery format
    const images = data.files
      .filter((file: any) => file.mimeType.startsWith('image/'))
      .map((file: any, index: number) => ({
        id: index + 1,
        src: `https://drive.google.com/thumbnail?id=${file.id}&sz=w1000`,
        alt: `${file.name} from Stratos Market Anaxos, Lesvos`,
        title: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension
        driveId: file.id
      }))

    console.log(`Fetched ${images.length} images from Google Drive folder`)

    return new Response(
      JSON.stringify({ images }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in fetch-drive-images function:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
