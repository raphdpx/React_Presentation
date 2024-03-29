﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using LinqKit;
using NsiTools.EfUtils.Core;
using NsiTools.EfUtils.Core.CriteriaBuilder;
using NsiTools.EfUtils.Core.Interfaces;
using NsiTools.EfUtils.Core.SearchBase;
using NsiTools.Utils.Extensions;
using RP.Abstractions.Services;
using RP.DataAccess.Entities;
using RP.DataAccess.Repositories.Interfaces;
using RP.Domain.Dtos.Details;
using RP.Domain.Dtos.Simple;
using RP.Domain.SearchObjects;

namespace RP.BusinessLogic.Services
{
    public class EmployeeService : SearchRepositoryBase, IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public EmployeeService(IEmployeeRepository employeeRepository, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _employeeRepository = employeeRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public void Delete(long employeeId)
        {
            _employeeRepository.Delete(employeeId);

            _unitOfWork.SaveChanges(new UnitOfWorkOptions()
            {
                EnableTrace = true
            });
        }

        public EmployeeDto GetEmployee(long employeeId)
        {
            var res = _employeeRepository.Query.Where(d => d.EmployeeId == employeeId).ProjectTo<EmployeeDto>(_mapper.ConfigurationProvider).SingleOrDefault();

            return res;
        }

        public EmployeeDto Save(EmployeeDto dto)
        {
            if (dto == null) return null;

            var employeeDbo = _employeeRepository.Query.SingleOrDefault(c => c.EmployeeId == dto.EmployeeId);

            if (employeeDbo == null) //ADD
            {
                employeeDbo = _mapper.Map<Employees>(dto);
                employeeDbo.EmployeeId = 0;
                _employeeRepository.Insert(employeeDbo);
            }
            else
            {
                _mapper.Map(dto, employeeDbo);
            }

            _unitOfWork.SaveChanges(new UnitOfWorkOptions()
            {
                EnableTrace = true
            });

            return GetEmployee(employeeDbo.EmployeeId);
        }

        public PaginatedResults<EmployeeGridDto> Search(EmployeeSearch search)
        {
            var query = _employeeRepository.Query.ProjectTo<EmployeeGridDto>(_mapper.ConfigurationProvider);
            if (!search.Filter.IsNotNullOrEmpy() || !search.Filter.HasValue())
                return _employeeRepository.PaginatedSearch(query, search);

            var filter = search.Filter.ToUpper();
            var cb = new CriteriaBuilder<EmployeeGridDto>();
            cb.Or(c => c.FirstName != null && c.FirstName.ToUpper().Contains(filter));
            cb.Or(c => c.LastName != null && c.LastName.ToUpper().Contains(filter));
            cb.Or(c => c.Email != null && c.Email.ToUpper().Contains(filter));
            cb.Or(c => c.PhoneNumber != null && c.PhoneNumber.ToUpper().Contains(filter));
            query = query.AsExpandable().Where(cb.GetCondition());
            return _employeeRepository.PaginatedSearch(query, search);
        }
    }
}
