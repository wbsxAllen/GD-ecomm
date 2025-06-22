package com.example.gdecomm.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.concurrent.TimeUnit;

@Service
public class RedisService {
    private static final Logger logger = LoggerFactory.getLogger(RedisService.class);
    
    @Autowired
    private StringRedisTemplate redisTemplate;

    public void addToBlacklist(String token, long expirationMillis) {
        try {
            redisTemplate.opsForValue().set("blacklist:token:" + token, "1", expirationMillis, TimeUnit.MILLISECONDS);
        } catch (Exception e) {
            logger.warn("Failed to add token to blacklist due to Redis connection issue: {}", e.getMessage());
        }
    }

    public boolean isBlacklisted(String token) {
        try {
            return Boolean.TRUE.equals(redisTemplate.hasKey("blacklist:token:" + token));
        } catch (Exception e) {
            logger.warn("Failed to check token blacklist due to Redis connection issue: {}", e.getMessage());
            return false;
        }
    }
} 