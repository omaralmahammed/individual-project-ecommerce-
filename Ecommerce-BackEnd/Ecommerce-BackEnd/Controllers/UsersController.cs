using Ecommerce_BackEnd.DTO;
using Ecommerce_BackEnd.Models;
using Ecommerce_BackEnd.myClass;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Security.Cryptography;

namespace Ecommerce_BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly MyDbContext _db;
        private readonly TokenGenerator _tokenGenerator;

        public UsersController(MyDbContext db, TokenGenerator tokenGenerator)
        {
            _db = db;
            _tokenGenerator = tokenGenerator;

        }

       

        [HttpGet("CheckEmail/{email}")]
        public IActionResult GetUserInfo(string email)
        {

            var checkEmail = _db.UserInformations.FirstOrDefault(e => e.Email == email);

                if(checkEmail == null){
                return NotFound();}

            return Ok(checkEmail);
        }

        [HttpGet("GetUserInfo/{id}")]
        public IActionResult GetUserInfo(int id)
        {   

            var userInfo = _db.UserInformations.Find(id);

            return Ok(userInfo);
        }

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        [HttpPost("UpdateUserInfo/{id}")]
        public IActionResult UpdateUserInfo(int id, [FromForm] userInfoRequestDTO newInfo)
        {
            var userInfo = _db.UserInformations.Find(id);

            userInfo.FirstName = newInfo.FirstName ?? userInfo.FirstName ;
            userInfo.LastName = newInfo.LastName; 
            userInfo.PhoneNumber = newInfo.PhoneNumber;
            userInfo.AlternativePhoneNumber = newInfo.AlternativePhoneNumber ?? userInfo.AlternativePhoneNumber;
            userInfo.City = newInfo.City;
            userInfo.Country = newInfo.Country;
            userInfo.Address = newInfo.Address ?? userInfo.Address;
            userInfo.Postcode = newInfo.Postcode ?? userInfo.Postcode;
            userInfo.Email = newInfo.Email;


            userInfo.Password = newInfo.Password ?? userInfo.Password;


            byte[] passwordHash, passwordSalt;
            PasswordHasher.CreatePasswordHash(userInfo.Password, out passwordHash, out passwordSalt);

            userInfo.PasswordHash = passwordHash ?? userInfo.PasswordHash;
            userInfo.PasswordSalt = passwordSalt ?? userInfo.PasswordSalt;


            _db.UserInformations.Update(userInfo);
            _db.SaveChanges();

            return Ok(userInfo);
        }

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        

        [HttpGet("Login/{email}/{password}")]
        public IActionResult Login(string email, string password)
        {

            var checkUser = _db.UserInformations.FirstOrDefault(u => u.Email == email);

            if (checkUser == null || !PasswordHasher.VerifyPasswordHash(password, checkUser.PasswordHash, checkUser.PasswordSalt))
            {
                return Unauthorized("Invalid username or password.");
            }

            var roles = _db.UserRoles.Where(x => x.UserId == checkUser.Id).Select(ur => ur.Role).ToList();

            var token = _tokenGenerator.GenerateToken(checkUser.Email, roles);

            return Ok(new { Token = token, userId = checkUser.Id });

        }


        /// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        [HttpPost("Register")]
        public IActionResult Register([FromForm] RegisterRequestDTO newUser)
        {
            var existingUser = _db.UserInformations.FirstOrDefault(user => user.Email == newUser.Email);

            if (existingUser != null)
            {
                return BadRequest("User already registered.");
            }

            byte[] passwordHash, passwordSalt;

            PasswordHasher.CreatePasswordHash(newUser.Password, out passwordHash, out passwordSalt);

            var addNewUser = new UserInformation
            {
                FirstName = newUser.FirstName,
                LastName = newUser.LastName,
                Email = newUser.Email,
                Password = newUser.Password,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt
            };

            _db.UserInformations.Add(addNewUser);
            _db.SaveChanges();

            var addNewCart = new ShoppingCart
            {
                UserId = addNewUser.Id,
                CreatedAt = DateTime.Now,
            };

            _db.ShoppingCarts.Add(addNewCart);
            _db.SaveChanges();

            return Ok("User registered successfully.");
        }


        /// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        [HttpPost("Contact")]
        public IActionResult ContactFeedBack([FromForm] ContactDTO feedBack)
        {
            var newFeedBack = new Contact
            {
                FirstName = feedBack.FirstName,
                LastName = feedBack.LastName,
                Email = feedBack.Email,
                Subject = feedBack.Subject,
                Message = feedBack.Message,
                DateAndTime = DateTime.UtcNow,
                Status = "0"
            };


            
            _db.Contacts.Add(newFeedBack);
            _db.SaveChanges();
            
            return Ok();
        }

     }
}
