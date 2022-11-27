namespace LearnOnWebApp.Legacy
{
    public class Product
    {
        public int Id { get; private set; }

        public string Name { get; set; }

        public string Category { get; private set; }

        public decimal Price { get; private set; }

        public Product(int id, string name, string category, decimal price)
        {
            Id = id;
            Name = name;
            Category = category;
            Price = price;
        }
    }
}
