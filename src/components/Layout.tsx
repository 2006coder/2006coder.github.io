import { Link } from "./Link";
import { useEffect, useRef, useState, type ReactNode } from "react";

const navigation = [
  { label: "Hello", href: "/#hello" },
  { label: "Education", href: "/#education" },
  { label: "Work", href: "/#work" },
  { label: "Skills", href: "/#skills" },
];

export function Layout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(true);

  const anchorJump = useRef(false);

  useEffect(() => {
    anchorJump.current = Boolean(window.location.hash);
    let previousY = Math.max(0, window.scrollY);
    let previousHash = window.location.hash;
    let scrollTimer = 0;
    function onScroll() {
      const y = Math.max(0, window.scrollY);
      if (anchorJump.current || window.location.hash !== previousHash) {
        anchorJump.current = true;
        window.clearTimeout(scrollTimer);
        scrollTimer = window.setTimeout(() => { anchorJump.current = false; }, 120);
        previousHash = window.location.hash;
        previousY = y;
        setNavVisible(true);
        return;
      }
      if (Math.abs(y - previousY) < 6 && y > 80) return;
      setNavVisible(y < previousY || y <= 80);
      previousY = y;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(scrollTimer);
    };
  }, []);
  return (
    <div
      className="min-h-screen pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] font-sans text-lg leading-[1.75] sm:text-2xl text-ink sm:[&_article_p]:text-justify"
      onClickCapture={(event) => {
        if ((event.target as HTMLElement).closest("a")?.getAttribute("href")?.startsWith("/#")) {
          anchorJump.current = true;
          setNavVisible(true);
        }
      }}
    >
      <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-30 h-[env(safe-area-inset-top)] bg-paper" />
      <div className="mx-auto max-w-[860px] px-9 py-5 sm:px-8 sm:py-7">
        <header
          onFocusCapture={() => setNavVisible(true)}
          className={`sticky top-0 z-20 -mx-9 bg-paper px-9 pt-[calc(0.75rem+env(safe-area-inset-top))] pb-3 sm:-mx-8 sm:px-8 ${navVisible || menuOpen ? "" : "-translate-y-full"}`}
        >
          <div className="flex items-center justify-between gap-4">
            <Link href="/" plain className="text-2xl">
              Bach Pham
            </Link>
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-controls="main-nav"
              onClick={() => setMenuOpen(!menuOpen)}
              className="min-h-11 cursor-pointer px-2 text-lg focus-visible:outline-2 focus-visible:outline-rust sm:hidden"
            >
              <span aria-hidden="true">{menuOpen ? "×" : "☰"}</span>{" "}
              {menuOpen ? "Close" : "Menu"}
            </button>
          </div>
          <nav
            id="main-nav"
            className={`${menuOpen ? "flex" : "hidden"} mt-2 flex-col gap-x-5 text-lg sm:flex sm:flex-row sm:flex-wrap [&_a]:py-2`}
            aria-label="Main navigation"
            onClick={() => setMenuOpen(false)}
          >
            {navigation.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
              >
                {label}
              </Link>
            ))}
            <Link href="mailto:bachpham.edu@gmail.com">Email</Link>
          </nav>
        </header>
        <main className="[&_[id]]:scroll-mt-[calc(6rem+env(safe-area-inset-top))] sm:[&_[id]]:scroll-mt-[calc(10rem+env(safe-area-inset-top))]">{children}</main>
        <footer className="mt-16 pt-4 text-lg text-muted">
          <Link className="mr-4" href="https://github.com/2006coder">
            GitHub
          </Link>
          <Link href="https://www.linkedin.com/in/2006coder">LinkedIn</Link>
          <p className="mt-2 mb-0">Bach Pham | Updated October 2026</p>
        </footer>
      </div>
    </div>
  );
}
