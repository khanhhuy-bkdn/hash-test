import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './schemas/cat.schema';

@Controller('cats')
export class CatsController {
    constructor(private readonly catsService: CatsService) { }

    @Post()
    async create(@Body() createCatDto: CreateCatDto) {
        await this.catsService.create(createCatDto);
    }

    @Get()
    async findAll(): Promise<Cat[]> {
        return this.catsService.findAll();
    }

    @Get(':txHash')
    async findOne(@Param('txHash') txHash: string): Promise<Cat> {
        return this.catsService.findOne({ txHash });
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.catsService.delete(id);
    }
}