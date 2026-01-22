import Image from "next/image";
import { testimonials } from "./Testimonials";

export default function Testimonials() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        
        <h2 className="text-3xl font-bold text-center mb-10">
          Success Stories
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-xl shadow-md text-center"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={80}
                height={80}
                className="rounded-full mx-auto mb-4"
              />
              <p className="text-gray-600 mb-4">"{item.message}"</p>
              <h4 className="font-semibold">{item.name}</h4>
              <span className="text-sm text-gray-500">{item.role}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
