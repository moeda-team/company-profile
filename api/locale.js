export default function handler(request, response) {
  response.setHeader('Cache-Control', 'private, no-store');
  response.status(200).json({ country: request.headers['x-vercel-ip-country'] || null });
}
