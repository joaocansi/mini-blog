import { GetServerSidePropsContext } from "next";
import Router from "next/router";

export default function redirect(ctx: GetServerSidePropsContext, target: string) {
  if (ctx.res) {
    ctx.res.writeHead(302, { Location: target });
    ctx.res.end();
  }else {
    Router.replace(target);
  }
}