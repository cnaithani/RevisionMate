﻿// =============================
// Email: info@ebenmonney.com
// www.ebenmonney.com/templates
// =============================

using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using DAL.Models;
using DAL.Repositories;
using DAL.Repositories.Interfaces;

namespace DAL
{
    public class UnitOfWork : IUnitOfWork
    {
        readonly ApplicationDbContext _context;

        IAreaMasterRepository _areaMaster;
        ICustomerRepository _customers;
        IProductRepository _products;
        IOrdersRepository _orders;
        ApplicationUser _user ;


        public UnitOfWork(ApplicationDbContext context)
        {
            _context = context;
        }
        public ApplicationUser CurrentUser
        {
            get
            {
                //if (_user == null && !String.IsNullOrEmpty(_context.CurrentUserId))
                //    _user = _context.Find<ApplicationUser>(_context.CurrentUserId);

                return _user;
            }
        }

        public IAreaMasterRepository AreaMaster
        {
            get
            {
                if (_areaMaster == null)
                    _areaMaster = new AreaMasterRepository(_context);

                return _areaMaster;
            }
        }

        public ICustomerRepository Customers
        {
            get
            {
                if (_customers == null)
                    _customers = new CustomerRepository(_context);

                return _customers;
            }
        }



        public IProductRepository Products
        {
            get
            {
                if (_products == null)
                    _products = new ProductRepository(_context);

                return _products;
            }
        }



        public IOrdersRepository Orders
        {
            get
            {
                if (_orders == null)
                    _orders = new OrdersRepository(_context);

                return _orders;
            }
        }




        public int SaveChanges()
        {
            return _context.SaveChanges();
        }
    }
}
