import { LangMiddleware } from "@/app/middleware/langMiddleware"

export function middleware(req) {
  LangMiddleware(req);
  console.log(req);
 
  return NextResponse.next()
}
