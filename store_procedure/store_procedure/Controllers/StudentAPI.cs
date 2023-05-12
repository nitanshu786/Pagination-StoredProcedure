using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using store_procedure.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace store_procedure.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentAPI : ControllerBase
    {
        private readonly string _connectionstring;
        public StudentAPI(IConfiguration configuration)
        {
            _connectionstring = configuration.GetConnectionString("constr");
        }
        [HttpGet("{id:int}")]
        public IActionResult StudentId(int id)
        {
            using (var connection = new SqlConnection(_connectionstring))
            {
                using (var command = new SqlCommand("StudentProcedure", connection))
                {
                    connection.Open();
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@Id", id);
                    command.Parameters.AddWithValue("@Operation", "READId");

                    var reader = command.ExecuteReader();
                    if (reader.Read())
                    {
                        var Students = new Student()
                        {
                            Id = (int)reader["Id"],
                            Name = reader["Name"].ToString(),
                            Address = reader["Address"].ToString(),
                            Marks = (int)reader["Marks"]

                        };
                        return Ok(Students);
                    }
                }
                return null;
            }
        }
        [HttpGet]
        public IEnumerable<Student> StudentALl()
        {
            var student = new List<Student>();
            using (var connection = new SqlConnection(_connectionstring))
            {
                using (var command = new SqlCommand("StudentProcedure", connection))
                {
                    connection.Open();
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@Operation", "READ");

                    var reader = command.ExecuteReader();
                    if (reader.Read())
                    {
                        
                        while(reader.Read())
                        {
                            var Students = new Student()
                            {
                                Id = (int)reader["Id"],
                                Name = reader["Name"].ToString(),
                                Address = reader["Address"].ToString(),
                                Marks = (int)reader["Marks"]

                            };
                            student.Add(Students);
                        }
                    }
                }
              
            }
            return student;
        }

        [HttpPut]
        public void  Studentupdate(Student student)
        {
           
                using (var connection = new SqlConnection(_connectionstring))
                {
                    using (var command = new SqlCommand("StudentProcedure", connection))
                    {
                        connection.Open();
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@Id", student.Id);
                        command.Parameters.AddWithValue("@Name", student.Name);
                        command.Parameters.AddWithValue("@Address", student.Address);
                        command.Parameters.AddWithValue("@Marks", student.Marks);
                        command.Parameters.AddWithValue("@Operation", "UPDATE");

                        command.ExecuteNonQuery();
                       
                    }
                }
            }

        [HttpPost]
        public void StudentSave(Student student)
        {

            using (var connection = new SqlConnection(_connectionstring))
            {
                using (var command = new SqlCommand("StudentProcedure", connection))
                {
                    connection.Open();
                    command.CommandType = CommandType.StoredProcedure;
                    //command.Parameters.AddWithValue("@Id", student.Id);
                    command.Parameters.AddWithValue("@Name", student.Name);
                    command.Parameters.AddWithValue("@Address", student.Address);
                    command.Parameters.AddWithValue("@Marks", student.Marks);
                    command.Parameters.AddWithValue("@Operation", "CREATE");

                    command.ExecuteNonQuery();

                }
            }
        }

        [HttpDelete("{id:int}")]
        public void StudentSave(int id)
        {

            using (var connection = new SqlConnection(_connectionstring))
            {
                using (var command = new SqlCommand("StudentProcedure", connection))
                {
                    connection.Open();
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@Id", id);
                    command.Parameters.AddWithValue("@Operation", "DELETE");

                    command.ExecuteNonQuery();

                }
            }
        }

    }
}
