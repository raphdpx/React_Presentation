using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using NsiTools.EfUtils.Core;
using NsiTools.EfUtils.Core.Interfaces;
using NsiTools.EfUtils.Core.SearchBase;
using RP.Abstractions.Services;
using RP.DataAccess.Entities;
using RP.DataAccess.Repositories.Interfaces;
using RP.Domain.Dtos.Details;
using RP.Domain.Dtos.Simple;
using RP.Domain.SearchObjects;

namespace RP.BusinessLogic.Services
{
    public class DogService : SearchRepositoryBase, IDogService
    {
        private readonly IDogRepository _dogRepository;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _uow;

        public DogService(IDogRepository dogRepository, IMapper mapper, IUnitOfWork uow)
        {
            _dogRepository = dogRepository;
            _mapper = mapper;
            _uow = uow;
        }

        public PaginatedResults<DogGridDto> Search(DogSearch search)
        {
            var query = _dogRepository.Query.ProjectTo<DogGridDto>(_mapper.ConfigurationProvider);



            return _dogRepository.PaginatedSearch(query, search);
        }

        public DogDto GetDog(long dogId)
        {
            return _dogRepository.Query.ProjectTo<DogDto>(_mapper.ConfigurationProvider)
                .SingleOrDefault(d => d.DogId == dogId);
        }

        Dog dbo = new Dog();

        public DogDto Save(DogDto dto)
        {
            if (dto == null) throw new ArgumentNullException();
            if (dto.DogId <= 0)
            {
                dto.DogId = 0;
                Dog dbo = _mapper.Map<Dog>(dto);
                _dogRepository.Insert(dbo);
            }
            else
            {
                Dog dbo = _dogRepository.GetById(dto.DogId);
                _mapper.Map(dto, dbo);
            }

            _uow.SaveChanges(new UnitOfWorkOptions());
            return _mapper.Map<DogDto>(dbo);
        }

        public void Delete(long dogId)
        {
            throw new NotImplementedException();
        }
    }
}
