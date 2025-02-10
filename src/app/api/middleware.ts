// Temporary middleware to bypass MongoDB
export async function withoutDB(handler: Function) {
  return async function(req: Request) {
    return new Response(JSON.stringify({ message: 'Database temporarily unavailable' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
