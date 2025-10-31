import css from "./Layout.module.css";

interface Props {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

export default function NotesLayout({ children, sidebar }: Props) {
  return (
    <section className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <div className={css.notesWrapper}>{children}</div>
    </section>
  );
}
