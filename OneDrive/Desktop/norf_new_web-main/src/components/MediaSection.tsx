export const MediaSection = () => {
  const mediaItems = [
    {
      category: "Film",
      date: "2024-01-15",
      author: "John Smith"
    },
    {
      category: "Podcast",
      date: "2024-01-10",
      author: "Sarah Johnson"
    },
    {
      category: "Music",
      date: "2024-01-05",
      author: "Mike Davis"
    },
    {
      category: "Article",
      date: "2023-12-28",
      author: "Emma Wilson"
    },
    {
      category: "Film",
      date: "2023-12-20",
      author: "Alex Brown"
    }
  ];

  return (
    <section className="py-20 border-t border-border/10">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-center mb-12 text-foreground">
          Media
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-4 px-4 font-playfair font-semibold text-foreground">
                  Category
                </th>
                <th className="text-left py-4 px-4 font-playfair font-semibold text-foreground">
                  Date
                </th>
                <th className="text-left py-4 px-4 font-playfair font-semibold text-foreground">
                  Author
                </th>
              </tr>
            </thead>
            <tbody>
              {mediaItems.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-border/50 hover:bg-muted/50 transition-colors duration-200"
                >
                  <td className="py-4 px-4 font-montserrat text-foreground">
                    {item.category}
                  </td>
                  <td className="py-4 px-4 font-montserrat text-muted-foreground">
                    {item.date}
                  </td>
                  <td className="py-4 px-4 font-montserrat text-foreground">
                    {item.author}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
