import Image from "next/image";
import Link from "next/link";
import React from "react";

export function Footer() {
  return (
    <div className="border-t py-6">
      <footer className="container text-center">
        &copy; {new Date().getFullYear()}{" "}
        <Link
          href="https://neplextech.com"
          className="font-semibold hover:underline"
        >
          Neplex
        </Link>{" "}
        — Licensed under GPL-3.0
      </footer>
    </div>
  );
}
