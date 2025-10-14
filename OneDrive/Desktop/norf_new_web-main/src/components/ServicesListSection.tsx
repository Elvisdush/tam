export const ServicesListSection = () => {
  const services = [
    { name: "Motion Identities", category: "Branding" },
    { name: "Commercial Content", category: "Advertising" },
    { name: "Film Production", category: "Cinematic" },
    { name: "Music Videos", category: "Creative" }
  ];

  return (
    <section className="py-32 border-t border-brand-light/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-12 gap-8">
          {/* Left - Title */}
          <div className="col-span-12 lg:col-span-3">
            <h2 className="text-xl font-light text-brand-light">Our Services</h2>
          </div>

          {/* Center - Services List */}
          <div className="col-span-12 lg:col-span-6">
            <div className="space-y-4">
              {services.map((service, index) => (
                <div 
                  key={index}
                  className="text-3xl md:text-4xl lg:text-5xl font-light text-brand-light leading-tight hover:text-primary transition-smooth cursor-pointer"
                >
                  {service.name}
                </div>
              ))}
            </div>
          </div>

          {/* Right - Number */}
          <div className="col-span-12 lg:col-span-3">
            <div className="flex flex-col items-end">
              <div className="text-xl font-light text-brand-light">
                0{services.length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
