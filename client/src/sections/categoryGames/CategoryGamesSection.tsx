import { CategorySectionProps } from ".";
import FeatureCard from "../../components/Home/featureCard/FeatureCard";

const CategorySection: React.FC<CategorySectionProps> = ({
  title,
  subtitle,
  features,
  variant = "boxed",
  columns = 4,
}) => {
  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">{title}</h2>
          <p className="text-[#94a3b8] mt-2 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-6`}
        >
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              variant={variant}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
