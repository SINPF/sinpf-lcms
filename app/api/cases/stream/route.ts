import { NextRequest } from "next/server";
import caseEvents from "@/lib/case-events";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      const onUpdate = () => {
        try {
          controller.enqueue(encoder.encode("data: refresh\n\n"));
        } catch {
          // client already disconnected
        }
      };

      // Keep-alive ping every 25s so proxies don't close the connection
      const heartbeat = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(": heartbeat\n\n"));
        } catch {
          clearInterval(heartbeat);
        }
      }, 25000);

      caseEvents.on("cases:updated", onUpdate);

      req.signal.addEventListener("abort", () => {
        caseEvents.off("cases:updated", onUpdate);
        clearInterval(heartbeat);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      "Connection": "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
