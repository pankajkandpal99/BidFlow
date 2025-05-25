import { useCategoryGames } from "../../contexts/CategoryGamesContext";
import { CategoryGamesLayout } from "../../layouts/categoryGamesLayout";

const FeaturedGames = () => {
  const { activeCategory, categoryGames, filteredGames, setActiveCategory } =
    useCategoryGames();

  if (!categoryGames.active) return null;

  return (
    <CategoryGamesLayout
      sectionTitle={categoryGames.sectionTitle}
      sectionDescription={categoryGames.sectionDescription}
      categories={categoryGames.categories}
      games={filteredGames}
      viewAllButtonText={categoryGames.viewAllButtonText}
      activeCategory={activeCategory}
      setActiveCategory={setActiveCategory}
      showAllGames={true}
    />
  );
};

export default FeaturedGames;
