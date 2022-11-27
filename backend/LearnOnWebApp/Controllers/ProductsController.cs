using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;
using System.Xml.Linq;
using LearnOnWebApp.Models;

namespace LearnOnWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private static readonly int _myNumber= 5;
        

        private  readonly ISet<Product> _products = new HashSet<Product>()
        {
            new Product(id:1, name:"Stolik kawowy", category:"Meble", price:1622.37m),
            new Product(id:2, name:"Lezak ogrodowy", category:"Ogrod", price:129.50m),
            new Product(id:3, name:"Ramka na zdjecia", category:"Dekoracje", price:59.90m)
        };

        [HttpGet]
        public IEnumerable<Product> Get()
        {
            return _products;
        }

        [HttpPost("{name}")]
        public void PostProduct(string name)
        {
            Console.WriteLine("Input name is: " + name);
            System.Diagnostics.Debug.WriteLine("Input name is: " + name);
            _products.Where(product=> product.Id == 3).First().Name = "Lozko";
            
            foreach (var product in _products)
            {
                Console.WriteLine(product.Name);    
            }

            ProductsController Test1 = new ProductsController();

            ProductsController Test2 = new ProductsController();

            Console.WriteLine(Test1._products);

            //ProductsController._myNumber = 12;
            //Test1._myNumber = 12;
            Console.WriteLine(_myNumber);
        }

        



    }

}
