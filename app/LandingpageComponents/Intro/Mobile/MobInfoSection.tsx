
export default function MobInfoSection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="w-full bg-white shadow-md rounded-lg flex flex-col overflow-y-hidden">
            <div className="w-full mx-auto bg-accent/20 flex flex-col justify-center p-5">
                <h2 className="text-2xl font-bold text-primary mb-4 border-b border-accent pb-2">
                    {title}
                </h2>
                <div className="text-gray-700 flex-1">{children}</div>
            </div>
        </section>
    );
}
