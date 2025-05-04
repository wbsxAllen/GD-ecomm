package com.example.gdecomm.controller;

import com.example.gdecomm.model.Category;
import com.example.gdecomm.payload.dto.CategoryDTO;
import com.example.gdecomm.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/public")
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping("/categories")
    public List<CategoryDTO> getAllCategories() {
        return categoryRepository.findAll(Sort.by(Sort.Direction.ASC, "categoryId"))
                .stream()
                .map(c -> new CategoryDTO(c.getCategoryId(), c.getCategoryName()))
                .collect(Collectors.toList());
    }

    @PostMapping("/categories")
    public String createCategory(@RequestBody CategoryDTO categoryDTO) {
        Category category = new Category();
        category.setCategoryName(categoryDTO.getCategoryName());
        categoryRepository.save(category);
        return "Category added successfully";
    }
}
