import Link from "next/link"
export default function Home() {
  return (
    <main className="p-6 max-w-3xl mx-auto space-y-4">
      <h1 className="text-2xl font-semibold">MyCarpet Lager</h1>
      <p>Welcome. Use the links below:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li><Link className="underline" href="/dashboard">Admin Dashboard</Link></li>
        <li><Link className="underline" href="/carpets">Carpets</Link></li>
        <li><Link className="underline" href="/scan">Scan</Link></li>
      </ul>
    </main>
  )
}
