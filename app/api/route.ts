export function GET(req){
    console.log(req.data);
    return new Response(JSON.stringify({m:'Hello'}), {
        headers: { 'Content-Type': 'application/json' }
    });    
}

export function POST(req){
    console.log(req.data)
}

