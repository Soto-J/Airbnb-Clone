// export { default } from "next-auth/middleware";
import { withAuth } from "next-auth/middleware";

// redirect to home page if not authenticated
export default withAuth({
  secret: process.env.SECRET,
});

export const config = {
  matcher: ["/trips", "/reservations", "/properties", "/favorites"],
};
